import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { LockLaminated, LockLaminatedOpen } from 'phosphor-react';
import { Fragment } from 'react';
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

const Memberships = () => {
  const [, { openModal }] = useModal();
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
        { label: 'APY', value: `${standard.apy * 100}% THEO` },
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
          value: `${premium.apy * 100}% THEO`,
          info: '+ ETH rebates for top 4000 Premium stakers',
        },
        { label: 'Locked for', value: '365 Days' },
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

Memberships.PageHead = () => {
  return <div>Memberships</div>;
};

export default Memberships;
