import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { LockLaminated, LockLaminatedOpen } from 'phosphor-react';
import { Fragment } from 'react';

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
const ACTION_CARD = [
  {
    header: {
      primary: 'Standard ',
      classes: 'bg-theo-navy dark:bg-theo-dark-navy text-white',
    },
    icon: <LockLaminatedOpen size={24} className="w-10" />,
    data: [
      { label: 'Assets', value: 'THEO' },
      { label: 'APY', value: '5% THEO' },
    ],
    actionButton: {
      label: 'Subscribe',
      onClick: () => {},
    },
    warning: 'No slashing penalties incurred on standard memberships',
  },
  {
    header: {
      primary: 'Premium',
      classes: 'bg-theo-cyan text-white',
    },
    icon: <LockLaminated size={24} className="w-10" />,
    data: [
      { label: 'Assets', value: 'THEO' },
      {
        label: 'APY',
        value: '30% THEO',
        info: '+ ETH airdrops to top 4000 holders ',
      },
      { label: 'Locked for', value: '365 Days' },
    ],
    highlight: true,
    actionButton: {
      label: 'Subscribe',
      onClick: () => {},
    },
    warning: 'Rewards and part of principal slashed if unstaked while locked - more info',
  },
];
const Memberships = () => {
  return (
    <PageContainer>
      <CardList className={'mb-4'}>
        {STATS.map((props, i) => (
          <StatCard {...props} key={i} />
        ))}
      </CardList>
      <CardList>
        {ACTION_CARD.map((props, i) => (
          <Fragment key={i}>
            <ActionCard {...props} />
          </Fragment>
        ))}
      </CardList>
    </PageContainer>
  );
};

Memberships.PageHead = () => {
  return <div>Memberships</div>;
};

export default Memberships;
