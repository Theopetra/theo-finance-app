import Card from '@/components/Card';
import CardList from '@/components/CardList';
import Icon from '@/components/Icons';
import PageContainer from '@/components/PageContainer';
import { addMinutes, addSeconds, intervalToDuration } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import BuyFormProvider from '../discount-buy/state/BuyFormProvider';
import useBuyForm from '../discount-buy/state/use-buy-form';
import MarketCard from './components/MarketCard';
import EthIcon from '../../public/assets/icons/eth.svg';
import UdcIcon from '../../public/assets/icons/usdc.svg';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { useRouter } from 'next/router';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';

const whitelistExpiry =
  parseInt(process.env.NEXT_PUBLIC_WHITELIST_EXPIRY_EPOCH_SECONDS || '0') * 1000;

const Whitelist = () => {
  const [timer, setTimer] = useState<Duration>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [{ groupedBondMarkets }] = useBuyForm();
  const { data: account, isError, isLoading } = useAccount();
  const router = useRouter();

  const hours = (timer?.days || 0) * 24 + (timer?.hours || 0);

  useEffect(() => {
    if (Date.now() <= whitelistExpiry) {
      const timer = setInterval(() => {
        const duration = intervalToDuration({
          start: new Date(),
          end: new Date(whitelistExpiry),
        });
        if (Date.now() <= whitelistExpiry) {
          setTimer(duration);
        } else {
          clearTimeout(timer);
          router.replace('/whitelist-sale');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  // disabling page. enable with page.tsx extension

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
            <CardList>
              {Date.now() <= whitelistExpiry && (
                <Card
                  title="Time Remaining"
                  headerRightComponent={<Icon name="clock2" className="h-6 w-6 text-theo-navy" />}
                >
                  <div className=" text-3xl font-extrabold">
                    {!hours ? '00' : hours < 10 ? `0${hours}` : hours}:
                    {!timer.minutes
                      ? '00'
                      : timer.minutes < 10
                      ? `0${timer.minutes}`
                      : timer.minutes}
                    :
                    {!timer.seconds
                      ? '00'
                      : timer.seconds < 10
                      ? `0${timer.seconds}`
                      : timer.seconds}
                  </div>
                </Card>
              )}
              <Card
                title="Assets Accepted"
                headerRightComponent={<Icon name="check" className="h-6 w-6 text-theo-navy" />}
              >
                <div className="text-2xl font-extrabold">
                  <div className="flex">
                    <div className="border- mr-3 flex items-center border-r-2 border-[#2f455c] p-3 text-[#2776cb]">
                      <img src={UdcIcon.src} alt="" className="mr-2 w-8" />
                      <span className=" sm:block lg:hidden xl:block">USDC</span>
                    </div>
                    <div className="flex items-center  text-[#262626]">
                      <img src={EthIcon.src} alt="" className="mr-2 w-8" />{' '}
                      <span className=" sm:block lg:hidden xl:block">ETHER</span>
                    </div>
                  </div>
                </div>
              </Card>
            </CardList>
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
          <p className="font-bold dark:text-white">Please connect your wallet</p>
        )}
      </PageContainer>
    </>
  );
};
Whitelist.PageHead = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { activeContractName } = useActiveBondDepo();

  return (
    <>
      <div>
        {activeContractName === 'WhitelistTheopetraBondDepository' ? 'Whitelist' : 'Pre-Market'}{' '}
        Sale!
      </div>
    </>
  );
};

export default Whitelist;
