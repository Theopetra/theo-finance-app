import ActionCard from '@/components/ActionCard';
import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import Tooltip from '@/components/Tooltip';
import { Fragment, useEffect, useState } from 'react';
import { addDays, intervalToDuration } from 'date-fns';

// Replace with to countdown
const startDate = addDays(new Date(), 1);
const endDate = new Date();

const ACTION_CARD = [
  {
    header: '6-Month',
    actionButton: {
      onClick: () => {},
    },
    ethPrice: '0.001',
    usdcPrice: '2.5',
    warning: 'Important: New buys are auto-locked until completion of the term',
  },
  {
    header: '12-Month',
    actionButton: {
      onClick: () => {},
    },
    ethPrice: '0.00075',
    usdcPrice: '1.75',
    warning: 'Important: New buys are auto-locked until completion of the term',
  },
  {
    header: '18-Month',
    actionButton: {
      onClick: () => {},
    },
    ethPrice: '.00025',
    usdcPrice: '1.00',
    warning: 'Important: New buys are auto-locked until completion of the term',
    highlight: true,
  },
];

const WhitelistSale = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const STATS = [
    {
      name: 'Time Remaining',
      value: `${timer.hours}:${timer.minutes}:${timer.seconds}`,
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
    },
    {
      name: 'Assets Accepted',
      value: '',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
    },
  ];

  const startTimer = () => {};

  useEffect(() => {
    const timer = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: startDate,
      });
      setTimer(duration);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer>
      <CardList className={'mb-4'} horizontalScroll>
        {STATS.map(({ name, value, tooltip }, i) => (
          <Card
            title={name}
            headerRightComponent={<Icon name="clock" className="h-6 w-6 text-theo-navy" />}
            key={i}
          >
            <div className=" text-3xl font-extrabold">{value}</div>
          </Card>
        ))}
      </CardList>
      <CardList>
        {ACTION_CARD.map(({ header, actionButton, warning, ethPrice, usdcPrice, highlight }, i) => (
          <Fragment key={`${header}_${i}`}>
            <Card
              className={`${highlight ? 'drop-shadow-[6px_6px_6px_rgba(80,174,203,0.75)]' : ''}`}
              darkModeBgColor="bg-black dark:bg-none"
              headerClasses="bg-theo-navy text-white dark:bg-theo-dark-navy"
              title={
                <div className="flex items-center pr-2">
                  <div className="font- mr-2 text-2xl font-extrabold">{header}</div>
                </div>
              }
              headerRightComponent={<Icon name="lock-laminated" className="w-8" />}
            >
              <div className="flex flex-1 flex-col justify-between">
                <div className="mb-8 flex-1 space-y-4">
                  <div className="flex justify-between text-lg text-theo-navy dark:text-theo-cyan">
                    <div>Asset</div>
                    <div>Price / THEO</div>
                  </div>
                  <div className="flex justify-between rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                    <div>Logo</div>
                    <div className="text-xl">{usdcPrice}</div>
                  </div>
                  <div className="flex justify-between rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                    <div>Logo</div>
                    <div className="text-xl">{ethPrice}</div>
                  </div>
                </div>
                <button className="border-button mb-3 w-full" onClick={actionButton.onClick}>
                  Buy THEO
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
  return <div>Whitelist Sale!</div>;
};

export default WhitelistSale;
