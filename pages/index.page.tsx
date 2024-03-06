import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';

import { UserPurchasesProvider } from './market-cards/state/UserPurchasesProvider';
import BuyFormProvider from './market-cards/state/BuyFormProvider';
import DiscountBuyCard from './market-cards/discount-buy';
import Card from '@/components/Card';
import Image from 'next/image';
import YourPurchases from './your-purchases/index.page';
import Claim from './claim/index.page';

const Dashboard = ({}) => {
  return (
    <>
      <Claim></Claim>
      {/* <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <Card>
              <video className="w-full" controls src="/assets/anatomy-of-a-discount-buy.mp4" />
            </Card>
          </div>
        </div>
      </PageContainer> */}
    </>
  );
};

Dashboard.PageStateProvider = (props) => (
  <UserPurchasesProvider {...props}>
    <BuyFormProvider {...props} bondDepoName="PublicPreListBondDepository" />
  </UserPurchasesProvider>
);

Dashboard.PageHead = () => {
  return <div>Claim your THEO</div>;
};

export default Dashboard;
