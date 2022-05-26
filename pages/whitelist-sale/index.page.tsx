import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import { addDays, intervalToDuration } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import BuyFormProvider from '../discount-buy/state/BuyFormProvider';
import useBuyForm from '../discount-buy/state/use-buy-form';
import MarketCard from './components/MarketCard';

const startDate = addDays(new Date(), 1);
const endDate = new Date();

const Whitelist = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [{ groupedBondMarkets }] = useBuyForm();
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
    <>
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
          {groupedBondMarkets.map((groupedBondMarket, i) => {
            return (
              <Fragment key={`${groupedBondMarket?.header}_${i}`}>
                <MarketCard bondMarkets={groupedBondMarket} />
              </Fragment>
            );
          })}
        </CardList>
      </PageContainer>
    </>
  );
};
Whitelist.PageStateProvider = (props) => <BuyFormProvider {...props} />;

export default Whitelist;
