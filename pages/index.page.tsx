import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import useBuyForm from './discount-buy/state/use-buy-form';
import { useAccount, useBalance } from 'wagmi';
import { BaseSyntheticEvent, useState } from 'react';
import useModal from '@/state/ui/theme/hooks/use-modal';
import DiscountBuyCard from './discount-buy';
import { UserPurchasesProvider } from './discount-buy/state/UserPurchasesProvider';
import BuyFormProvider from './discount-buy/state/BuyFormProvider';
import DiscountBuyMobyCard from './discount-buy-moby';

const Dashboard = ({}) => {
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="mt-4">
          <p className=" mb-4 dark:text-white">
            Growth Markets allow you to buy THEO directly from the protocol & allocate your funding
            to the project of your choice. When you buy THEO, it is locked for a period of time
            before you can claim it.{' '}
            <a href="#" className="underline">
              {' '}
              Learn More
            </a>
          </p>
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <div className="flex w-full grid-cols-2 space-x-4">
              <DiscountBuyCard />
              <DiscountBuyMobyCard />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

Dashboard.PageStateProvider = (props) => <UserPurchasesProvider {...props} />;

Dashboard.PageHead = () => {
  return <div>Expand the Network</div>;
};

export default Dashboard;
