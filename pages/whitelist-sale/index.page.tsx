import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import { addDays, addMinutes, intervalToDuration } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import BuyFormProvider from '../discount-buy/state/BuyFormProvider';
import useBuyForm from '../discount-buy/state/use-buy-form';
import MarketCard from './components/MarketCard';
import EthIcon from '../../public/assets/icons/eth.svg';
import UdcIcon from '../../public/assets/icons/usdc.svg';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { time } from 'console';

// TODO: Replace with env vars
const startDate = addMinutes(new Date(), 9);
const endDate = new Date();

const Whitelist = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [{ groupedBondMarkets }] = useBuyForm();
  const { data: account, isError, isLoading } = useAccount();

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
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/whitelist-sale/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        {account?.address ? (
          <>
            <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2 sm:space-y-0 md:flex-row">
              <Card
                className="basis-1/3"
                title="Time Remaining"
                headerRightComponent={<Icon name="clock2" className="h-6 w-6 text-theo-navy" />}
              >
                <div className=" text-3xl font-extrabold">
                  {!timer.hours ? '00' : timer.hours < 10 ? `0${timer.hours}` : timer.hours}:
                  {!timer.minutes ? '00' : timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
                  :
                  {!timer.seconds ? '00' : timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
                </div>
              </Card>
              <Card
                className="basis-2/3"
                title="Assets Accepted"
                headerRightComponent={<Icon name="check" className="h-6 w-6 text-theo-navy" />}
              >
                <div className=" text-3xl font-extrabold">
                  <div className="flex">
                    <div className="border- mr-3 flex items-center border-r-2 border-[#2f455c] p-3 text-[#2776cb]">
                      <img src={UdcIcon.src} alt="" className="mr-2 w-10" /> USDC
                    </div>
                    <div className="flex items-center  text-[#262626]">
                      <img src={EthIcon.src} alt="" className="mr-2 w-6" /> ETHER
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {groupedBondMarkets.length ? (
              <CardList>
                {groupedBondMarkets.map((groupedBondMarket, i) => {
                  return (
                    <Fragment key={`${groupedBondMarket?.header}_${i}`}>
                      <MarketCard bondMarkets={groupedBondMarket} />
                    </Fragment>
                  );
                })}
              </CardList>
            ) : (
              <>There are no markets on the network. Please switch to a supported network.</>
            )}
          </>
        ) : (
          'Please connect your wallet'
        )}
      </PageContainer>
    </>
  );
};
Whitelist.PageHead = () => {
  return <div>Whitelist Sale!</div>;
};
Whitelist.PageStateProvider = (props) => <BuyFormProvider {...props} />;

export default Whitelist;
