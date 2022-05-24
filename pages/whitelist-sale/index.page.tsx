import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import { Fragment, useEffect, useState } from 'react';
import { addDays, intervalToDuration } from 'date-fns';
import { useContract, useContractRead, useProvider } from 'wagmi';
import TheopetraBondDeposiotory from '../TheopetraBondDepository.json';

// Replace with to countdown
const startDate = addDays(new Date(), 1);
const endDate = new Date();

const WhitelistSale = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [bondMarkets, setBondMarkets] = useState({});
  const provider = useProvider();
  const { data } = useContractRead(
    {
      addressOrName: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      contractInterface: TheopetraBondDeposiotory.abi,
    },
    'liveMarkets'
  );

  const contract = useContract({
    addressOrName: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
    contractInterface: TheopetraBondDeposiotory.abi,
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
              highlight: vestingInMonths === 18,
              markets: [...(termsMap?.[mapKey] ? termsMap?.[mapKey].markets : []), { ...terms }],
            });
          })
          .catch((err) => console.log(err.stack))
    );

    Promise.allSettled([setTerms]).then(([result]) => {
      setBondMarkets(termsMap);
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
        {Object.values(bondMarkets)
          .sort((a, b) => a.header - b.header)
          .map((bondMarket, i) => {
            console.log(bondMarket);

            return (
              <Fragment key={`${bondMarket.header}_${i}`}>
                <Card
                  className={`${
                    bondMarket.highlight ? 'drop-shadow-[6px_6px_6px_rgba(80,174,203,0.75)]' : ''
                  }`}
                  darkModeBgColor="bg-black dark:bg-none"
                  headerClasses="bg-theo-navy text-white dark:bg-theo-dark-navy"
                  title={
                    <div className="flex items-center pr-2">
                      <div className="font- mr-2 text-2xl font-extrabold">
                        {bondMarket.header}-Month
                      </div>
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
                        <div className="text-xl">usdcPrice</div>
                      </div>
                      <div className="flex justify-between rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                        <div>Logo</div>
                        <div className="text-xl">ethPrice</div>
                      </div>
                    </div>
                    <button className="border-button mb-3 w-full" onClick={() => {}}>
                      Buy THEO
                    </button>
                    <div className="text-center  text-xs dark:text-[#ffffffb3]">
                      Important: New buys are auto-locked until completion of the term
                    </div>
                  </div>
                </Card>
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

export default WhitelistSale;
