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
import { Fragment } from 'react';
import { useContractRead } from 'wagmi';
import { UserPurchasesProvider } from '../discount-buy/state/UserPurchasesProvider';
import SubscribeFormModal from './components/SubscribeFormModal';
import membershipData from './membershipData';

const STATS = [
  {
    name: 'Total THEO Staked',
    value: '78%',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: 'Total Value Staked',
    value: '$11,186,090',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
];
const rewardAsPercent = (reward: Result) => {
  return Number(BigNumber.from(reward).toNumber() / 10000).toFixed();
};
const Memberships = () => {
  const [, { openModal }] = useModal();

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
      warning: 'Rewards and part of principal slashed if unstaked while locked - more info',
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
