import ActionCard from '@/components/ActionCard';
import CardList from '@/components/CardList';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { Fragment, ReactNode } from 'react';
import BuyFormProvider from './state/BuyFormProvider';
import DiscountBuyForm from './components/DiscountBuyForm';

const STATS = [
  {
    name: 'Treasury Balance',
    value: '$110,310,013',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: 'THEO Price',
    value: '$35.42',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
];
const DiscountBuy = () => {
  const [{}, { closeModal, openModal }] = useModal();

  const ACTION_CARD = [
    {
      header: {
        primary: <span className="text-4xl">Intro</span>,
      },
      icon: 'intersect',
      data: {
        discount: { label: 'Discount', value: '1-4%' },
        buyWith: { label: 'Buy With', value: 'ETH/USD' },
        bondPrice: { label: 'Bond Price', value: '$31.50' },
        lockDuration: { label: 'Lock Duration', value: '14 Days' },
      },
      warning:
        'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
    },
    {
      header: {
        primary: <span className="text-4xl">Intermediate</span>,
      },
      icon: 'intersect',
      data: {
        discount: { label: 'Discount', value: '3-9%' },
        buyWith: { label: '', value: 'ETH/USD' },
        bondPrice: { label: 'Bond Price', value: '$28.30' },
        lockDuration: { label: 'Lock Duration', value: '28 Days' },
      },
      warning:
        'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
    },
    {
      header: {
        primary: <span className="text-4xl">Pro</span>,
      },
      icon: 'intersect',
      data: {
        discount: { label: 'Discount', value: 'ETH-THEO' },
        buyWith: { label: '', value: '8-30%' },
        bondPrice: { label: 'Bond Price', value: '$25.20' },
        lockDuration: { label: 'Lock Duration', value: '84 Days' },
      },
      warning:
        'Important: New buys are auto-staked (accrue rebase rewards) and no longer vest linearly',
    },
  ];

  return (
    <BuyFormProvider>
      <PageContainer>
        <CardList className={'mb-4'} horizontalScroll>
          {STATS.map((props) => (
            <Fragment key={props.name}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <CardList>
          {ACTION_CARD.map((props, i) => (
            <Fragment key={`${props.header.primary}_${i}`}>
              <ActionCard
                {...props}
                data={Object.values(props.data)}
                actionButton={{
                  label: 'Buy Theo',
                  onClick: () => openModal(<DiscountBuyForm data={props.data} />),
                  icon: 'intersect',
                }}
              />
            </Fragment>
          ))}
        </CardList>
      </PageContainer>
    </BuyFormProvider>
  );
};
const PageHeadComponent = () => {
  return (
    <>
      Discount Buy <span className="text-xl">(Bond)</span>
    </>
  );
};

DiscountBuy.PageStateProvider = (props) => <BuyFormProvider {...props} />;

DiscountBuy.PageHead = PageHeadComponent;

export default DiscountBuy;
