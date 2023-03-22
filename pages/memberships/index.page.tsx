import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useContractInfo } from '@/hooks/useContractInfo';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { LockLaminated, LockLaminatedOpen } from 'phosphor-react';
import { Fragment, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { UserPurchasesProvider } from '../discount-buy/state/UserPurchasesProvider';
import SubscribeFormModal from './components/SubscribeFormModal';
import membershipData from './membershipData';

const useStats = () => {
  const { address, abi } = useContractInfo('TheopetraERC20Token');
  const { address: stakingAddress } = useContractInfo('TheopetraStaking');
  const { address: lockedAddress } = useContractInfo('TheopetraStakingLocked');
  const contractParams = {
    addressOrName: address,
    contractInterface: abi,
  };
  const { data: totalSupply, isLoading: isLoadingLocked } = useContractRead(
    contractParams,
    'totalSupply'
  );
  const { data: balanceOfStaking } = useContractRead(contractParams, 'balanceOf', {
    args: [stakingAddress],
  });
  const { data: balanceOfStakingLocked } = useContractRead(contractParams, 'balanceOf', {
    args: [lockedAddress],
  });
  const totalTheoStaked = useMemo(() => {
    if (totalSupply && balanceOfStaking && balanceOfStakingLocked) {
      const lockedBal = Number(BigNumber.from(balanceOfStakingLocked).toString());
      const stakingBal = Number(BigNumber.from(balanceOfStaking).toString());
      const totalStaked = lockedBal + stakingBal;
      const totalSupplyNumber = Number(BigNumber.from(totalSupply).toString());
      return Number((totalStaked / totalSupplyNumber) * 100).toFixed(2);
    }
    return 0;
  }, [totalSupply, balanceOfStaking, balanceOfStakingLocked]);
  // const totalValueStaked = useMemo(() => {
  //   if (totalSupply) {
  //     return BigNumber.from(totalSupply).toNumber() / 1000000;
  //   }
  //   return 0;
  // }, [totalSupply]);

  return [
    {
      name: 'Total THEO Staked',
      value: totalTheoStaked ? `${totalTheoStaked}%` : 'N/A',
    },
    {
      name: 'Total Value Staked',
      value: '$11,186,090',
    },
  ];
};
const rewardAsPercent = (reward: Result) => {
  return Number(BigNumber.from(reward).toNumber() / 10000).toFixed();
};
const Memberships = () => {
  const [, { openModal }] = useModal();
  const STATS = useStats();
  // StakingDistributor
  const { address, abi } = useContractInfo('StakingDistributor');

  const { data: nextRewardRateLocked, isLoading: isLoadingLocked } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'nextRewardRate',
    {
      args: [0],
    }
  );
  const { data: nextRewardRateStaking, isLoading: isLoadingStaking } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'nextRewardRate',
    {
      args: [1],
    }
  );
  const { data: epochLength, isLoading: isEpochLengthLoading } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'epochLength'
  );

  const { premium, standard } = membershipData;
  const ACTION_CARD = [
    {
      type: standard.type,
      header: {
        primary: <span className="capitalize">{standard.type}</span>,
        classes: 'bg-theo-navy dark:bg-theo-dark-navy text-white',
      },
      icon: <LockLaminatedOpen size={24} className="w-10" />,
      data: [
        { label: 'Assets', value: 'THEO' },
        {
          label: 'APY',
          value: `${
            !isLoadingStaking && nextRewardRateStaking && rewardAsPercent(nextRewardRateStaking)
          }% THEO`,
        },
      ],

      warning: 'No slashing penalties incurred on standard memberships',
    },
    {
      type: premium.type,
      header: {
        primary: 'Premium',
        classes: 'bg-theo-cyan text-white',
      },
      icon: <LockLaminated size={24} className="w-10" />,
      data: [
        { label: 'Assets', value: 'THEO' },
        {
          label: 'APY',
          value: `${
            !isLoadingLocked && nextRewardRateLocked && rewardAsPercent(nextRewardRateLocked)
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
          Rewards and part of principal slashed if unstaked while locked -{' '}
          <a
            href="https://docs.theopetralabs.com/protocol/staking"
            target="_blank"
            rel="noreferrer"
          >
            more info
          </a>
        </>
      ),
    },
  ];
  // disabling page. enable with page.tsx extension
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
                  openModal(<SubscribeFormModal membership={membershipData[props.type]} />),
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
