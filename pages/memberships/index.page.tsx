import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useContractInfo } from '@/hooks/useContractInfo';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { LockLaminated, LockLaminatedOpen } from 'phosphor-react';
import { Fragment, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { UserPurchasesProvider } from '../discount-buy/state/UserPurchasesProvider';
import SubscribeFormModal from './components/SubscribeFormModal';
import membershipData from './membershipData';
import { rewardAsPercent } from '@/util/reward-as-percent';
import { Abi, formatUnits } from 'viem';

const useStats = () => {
  const { address, abi } = useContractInfo('TheopetraERC20Token');
  const { address: stakingAddress } = useContractInfo('TheopetraStaking');
  const { address: lockedAddress } = useContractInfo('TheopetraStakingLocked');
  const { address: calcAddress, abi: calcAbi } = useContractInfo('BondingCalculator');
  const { address: ChainlinkPriceFeed, abi: ChainlinkPriceFeedAbi } =
    useContractInfo('ChainlinkPriceFeed');
  const { data: priceFeed } = useContractRead({
    address: ChainlinkPriceFeed,
    abi: ChainlinkPriceFeedAbi as Abi,
    functionName: 'latestAnswer',
  });

  const contractParams = {
    address,
    abi: abi as Abi,
  };
  const { data: totalSupply } = useContractRead({ ...contractParams, functionName: 'totalSupply' });
  const { data: balanceOfStaking } = useContractRead({
    ...contractParams,
    functionName: 'balanceOf',
    args: [stakingAddress],
  });
  const { data: balanceOfStakingLocked } = useContractRead({
    ...contractParams,
    functionName: 'balanceOf',
    args: [lockedAddress],
  });

  const totalTheoStaked = useMemo(() => {
    if (totalSupply && balanceOfStaking && balanceOfStakingLocked) {
      const lockedBal = Number(BigInt(balanceOfStakingLocked as bigint));
      const stakingBal = Number(BigInt(balanceOfStaking as bigint));
      const totalTheoStaked = lockedBal + stakingBal;
      return totalTheoStaked;
    }
    return 0;
  }, [totalSupply, balanceOfStaking, balanceOfStakingLocked]);

  const totalTheoStakedAsPercent = useMemo(() => {
    if (totalSupply) {
      const totalSupplyNumber = Number(BigInt(totalSupply as bigint));
      return Number((totalTheoStaked / totalSupplyNumber) * 100).toFixed(2);
    }
    return 0;
  }, [totalSupply, totalTheoStaked]);
  const { data: valuation } = useContractRead({
    address: calcAddress,
    abi: calcAbi as Abi,
    functionName: 'valuation',
    args: [address, totalTheoStaked],
  });
  const totalValueStakedUsd = useMemo(() => {
    if (valuation && priceFeed) {
      const price = formatUnits(BigInt(priceFeed as bigint), 8);
      const valuationNumber = formatUnits(BigInt(valuation as bigint), 18);
      const totalValueStaked = Number(valuationNumber) * Number(price);

      return totalValueStaked;
    }
    return 0;
  }, [valuation, priceFeed]);

  return [
    {
      name: 'Total $THEO Staked',
      value: totalTheoStakedAsPercent ? `${totalTheoStakedAsPercent}%` : 'N/A',
      tooltip: 'Total % staked is calculated based on the total supply of $THEO',
    },
    {
      name: 'Total Value Staked',
      value: totalValueStakedUsd ? `$${totalValueStakedUsd.toLocaleString()}` : 'N/A',
    },
  ];
};

const Memberships = () => {
  const [, { openModal }] = useModal();
  const STATS = useStats();
  // StakingDistributor
  const { address, abi } = useContractInfo('StakingDistributor');

  const { data: nextRewardRateLocked, isLoading: isLoadingLocked } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'nextRewardRate',
    args: [3],
  });
  const { data: nextRewardRateStaking, isLoading: isLoadingStaking } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'nextRewardRate',
    args: [2],
  });
  const { data: epochLength, isLoading: isEpochLengthLoading } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'epochLength',
  });

  const { premium, standard } = membershipData;
  const ACTION_CARD = [
    {
      type: standard.type,
      apy: nextRewardRateStaking && rewardAsPercent(nextRewardRateStaking),
      header: {
        primary: <span className="capitalize">{standard.type}</span>,
        classes: 'bg-theo-navy dark:bg-theo-dark-navy text-white',
      },
      icon: <LockLaminatedOpen size={28} className="w-10" />,
      data: [
        { label: 'Assets', value: 'THEO' },
        {
          label: 'APR',
          value: `${
            (!isLoadingStaking &&
              nextRewardRateStaking &&
              rewardAsPercent(nextRewardRateStaking)) ||
            0
          }% THEO`,
        },
      ],

      warning: 'No slashing penalties incurred on standard memberships',
    },
    {
      type: premium.type,
      apy: nextRewardRateLocked && rewardAsPercent(nextRewardRateLocked),
      header: {
        primary: 'Premium',
        classes: 'bg-theo-cyan text-white',
      },
      icon: <LockLaminated size={28} className="w-10" />,
      data: [
        { label: 'Assets', value: 'THEO' },
        {
          label: 'APR',
          value: `${
            (!isLoadingLocked && nextRewardRateLocked && rewardAsPercent(nextRewardRateLocked)) || 0
          }% THEO`,
          info: '+ ETH rebates for top 4000 Premium stakers',
        },
        {
          label: 'Locked for',
          value: `${!isEpochLengthLoading ? Number(epochLength) / 86400 : 0} Days`,
        },
      ],
      highlight: true,
      warning: (
        <>
          Dont worry, slashing penalties have been removed! 
          <a
            href="https://docs.theopetralabs.com"
            target="_blank"
            rel="noreferrer"
            className="text-theo-cyan underline"
          >
            more info
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/memberships/your-memberships', name: 'Your Memberships' }]}
        />
      </div>
      <CardList className={'mb-4'}>
        {STATS.map((props, i) => (
          <StatCard {...props} key={i} />
        ))}
      </CardList>
      <CardList>
        {ACTION_CARD.map((props, i) => (
          <Fragment key={i}>
            <ActionCard
              {...props}
              actionButton={{
                label: 'Subscribe',
                onClick: () =>
                  openModal(
                    <SubscribeFormModal
                      membership={{
                        ...membershipData[props.type],
                      }}
                    />
                  ),
              }}
            />
          </Fragment>
        ))}
      </CardList>
    </PageContainer>
  );
};
Memberships.PageStateProvider = (props) => <UserPurchasesProvider {...props} />;
Memberships.PageHead = () => {
  return <div>Memberships</div>;
};

export default Memberships;
