import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';

import { UserPurchasesProvider } from './market-cards/state/UserPurchasesProvider';
import BuyFormProvider from './market-cards/state/BuyFormProvider';
import DiscountBuyCard from './market-cards/discount-buy';

const Dashboard = ({}) => {
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav items={[{ href: '/your-purchases', name: 'Your Purchases' }]} />
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
          <div className="mb-14 flex max-w-lg flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <div className="flex w-full grid-cols-2 space-x-4">
              <DiscountBuyCard />
              {/* <DiscountBuyMobyCard /> */}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

Dashboard.PageStateProvider = (props) => (
  <UserPurchasesProvider {...props}>
    <BuyFormProvider {...props} bondDepoName="PublicPreListBondDepository" />
  </UserPurchasesProvider>
);

Dashboard.PageHead = () => {
  return <div>Expand the Network</div>;
};

export default Dashboard;
