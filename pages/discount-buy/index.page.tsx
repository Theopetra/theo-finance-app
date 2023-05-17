import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { Fragment } from 'react';
import BuyFormProvider from './state/BuyFormProvider';
import DiscountBuyForm from './components/DiscountBuyForm';
import useBuyForm from './state/use-buy-form';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { Intersect } from 'phosphor-react';
import MarketCard from '../whitelist-sale/components/MarketCard';
import { useAccount } from 'wagmi';

const STATS = [
  {
    name: 'Treasury Balance',
    value: '$110,310,013',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: '$THEO Price',
    value: '$35.42',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
];
const DiscountBuy = () => {
  const [{}, { openModal }] = useModal();
  const [{ groupedBondMarkets }] = useBuyForm();
  const { data: account, isError, isLoading } = useAccount();
  console.log(groupedBondMarkets);
  // const ACTION_CARD = [
  //   {
  //     header: {
  //       primary: <span className="text-2xl sm:text-4xl lg:text-2xl xl:text-4xl">Intro</span>,
  //     },
  //     icon: <Intersect size={26} className="mr-2 w-8" />,
  //     data: {
  //       level: { label: 'Intro', value: 'intro' },
  //       discount: { label: 'Discount', value: '1-4%' },
  //       buyWith: { label: 'Buy With', value: 'ETH/USD' },
  //       bondPrice: { label: 'Bond Price', value: '$31.50' },
  //       lockDuration: { label: 'Lock Duration', value: '14 Days' },
  //     },
  //     warning:
  //       'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
  //   },
  //   {
  //     header: {
  //       primary: <span className="text-2xl sm:text-4xl lg:text-2xl xl:text-4xl">Intermediate</span>,
  //     },
  //     icon: <Intersect size={26} className="mr-2 w-8" />,
  //     data: {
  //       level: { label: 'Intermediate', value: 'intermediate' },
  //       discount: { label: 'Discount', value: '3-9%' },
  //       buyWith: { label: 'Buy With', value: 'ETH/USD' },
  //       bondPrice: { label: 'Bond Price', value: '$28.30' },
  //       lockDuration: { label: 'Lock Duration', value: '28 Days' },
  //     },
  //     warning:
  //       'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
  //   },
  //   {
  //     header: {
  //       primary: <span className="text-2xl sm:text-4xl lg:text-2xl xl:text-4xl">Pro</span>,
  //     },
  //     icon: <Intersect size={26} className="mr-2 w-8" />,
  //     highlight: true,
  //     data: {
  //       level: { label: 'Pro', value: 'pro' },
  //       discount: { label: 'Discount', value: '8-30%' },
  //       buyWith: { label: 'Buy With', value: 'ETH/USD' },
  //       bondPrice: { label: 'Bond Price', value: '$25.20' },
  //       lockDuration: { label: 'Lock Duration', value: '84 Days' },
  //     },
  //     warning:
  //       'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
  //   },
  // ];

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        {account?.address ? (
          <>
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
      {/* <PageContainer>
        <CardList className={'sm:mb-4'}>
          {STATS.map((props) => (
            <Fragment key={props.name}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <CardList>
          {ACTION_CARD.map((props: any, i) => {
            const listData = { ...props.data };
            delete listData.level;
            return (
              <Fragment key={`${props.header.primary}_${i}`}>
                <ActionCard
                  {...props}
                  data={Object.values(listData)}
                  actionButton={{
                    label: 'Buy $THEO',
                    onClick: () => {
                      setSelection(props.data);
                      openModal(<DiscountBuyForm />);
                    },
                    icon: <Intersect size={26} className="mr-2 w-8" />,
                  }}
                />
              </Fragment>
            );
          })}
        </CardList>
      </PageContainer> */}
    </>
  );
};

DiscountBuy.PageStateProvider = (props) => <BuyFormProvider {...props} />;
DiscountBuy.PageHead = () => {
  return <div>Discount Buy</div>;
};

export default DiscountBuy;
