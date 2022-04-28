import ActionCard from '@/components/ActionCard';
import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { Fragment } from 'react';

const STATS = [
  {
    name: 'Time Remaining',
    value: '5-30% APY',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: 'Assets Accepted',
    value: '78%',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
];
const ACTION_CARD = [
  {
    header: '6-Month',
    actionButton: {
      label: 'Buy THEO',
      onClick: () => {},
    },
    warning: 'Important: New buys are auto-locked until completion of the term',
  },
  {
    header: '12-Month',
    actionButton: {
      label: 'Buy THEO',
      onClick: () => {},
    },
    warning: 'Important: New buys are auto-locked until completion of the term',
  },
  {
    header: '18-Month',
    actionButton: {
      label: 'Buy THEO',
      onClick: () => {},
    },
    warning: 'Important: New buys are auto-locked until completion of the term',
  },
];
const WhitelistSale = () => {
  return (
    <PageContainer>
      <CardList className={'mb-4'} horizontalScroll>
        {STATS.map((props, i) => (
          <StatCard {...props} key={i} />
        ))}
      </CardList>
      <CardList>
        {ACTION_CARD.map(({ header, actionButton, warning }, i) => (
          <Fragment key={`${header}_${i}`}>
            <Card
              darkModeBgColor="bg-black dark:bg-none"
              headerClasses="bg-theo-navy text-white"
              title={
                <div className="flex items-center pr-2">
                  <div className="mr-2 text-2xl font- font-extrabold">{header}</div>
                </div>
              }
              headerRightComponent={<Icon name="lock-laminated" className="w-10" />}
            >
              <div className="flex flex-1 flex-col justify-between">
                <div className="mb-8 flex-1 space-y-4"></div>
                <button className="border-button mb-3 w-full" onClick={actionButton.onClick}>
                  {actionButton.label}
                </button>
                <div className="text-center  text-xs dark:text-[#ffffffb3]">{warning}</div>
              </div>
            </Card>
          </Fragment>
        ))}
      </CardList>
    </PageContainer>
  );
};

WhitelistSale.PageHead = () => {
  return 'Whitelist Sale!';
};

export default WhitelistSale;
