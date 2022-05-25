import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import { Fragment, useEffect, useState } from 'react';
import { addDays, intervalToDuration } from 'date-fns';
import { useContract, useContractEvent, useContractRead, useProvider } from 'wagmi';
import TheopetraBondDepository from '../TheopetraBondDepository.json';

import BuyFormProvider from '../discount-buy/state/BuyFormProvider';
import { BigNumber, utils } from 'ethers';
import MarketCard from './components/MarketCard';

// Replace with to countdown
const startDate = addDays(new Date(), 1);
const endDate = new Date();

const WhitelistSale = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [groupedBondMarkets, setGroupedBondMarkets] = useState({});

  const provider = useProvider();
  const { data } = useContractRead(
    {
      addressOrName: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      contractInterface: TheopetraBondDepository.abi,
    },
    'liveMarkets'
  );

  useContractEvent(
    {
      addressOrName: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      contractInterface: TheopetraBondDepository.abi,
    },
    'CreateMarket',
    (event) => {
      // TODO: update bondMarkets on this event
      console.log(event);
    }
  );

  const contract = useContract({
    addressOrName: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
    contractInterface: TheopetraBondDepository.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const termsMap = {};

    const setTerms = data?.map(
      async (bondMarket) =>
        await contract
          .terms(bondMarket)
          .then((terms) => {
            const vestingInMonths = Math.floor(terms.vesting / 60 / 60 / 24 / 30);
            const mapKey = vestingInMonths;

            return (termsMap[mapKey] = {
              header: mapKey,
              // todo: this isn't right
              bigNumberPrice: bondMarket,
              highlight: vestingInMonths === 18,
              markets: [...(termsMap?.[mapKey] ? termsMap?.[mapKey].markets : []), { ...terms }],
            });
          })
          .catch((err) => console.log(err.stack))
    );

    Promise.allSettled([setTerms]).then(([result]) => {
      setGroupedBondMarkets(termsMap);
    });
  }, [contract, data]);

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
        {Object.values(groupedBondMarkets)
          .sort((a, b) => a.header - b.header)
          .map((groupedBondMarket, i) => {
            console.log(groupedBondMarket);

            return (
              <Fragment key={`${groupedBondMarket.header}_${i}`}>
                <MarketCard bondMarkets={groupedBondMarket} />
              </Fragment>
            );
          })}
      </CardList>
    </PageContainer>
  );
};

WhitelistSale.PageHead = () => {
  return <div>Whitelist Sale!</div>;
};
WhitelistSale.PageStateProvider = (props) => <BuyFormProvider {...props} />;

export default WhitelistSale;
