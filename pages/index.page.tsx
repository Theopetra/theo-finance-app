import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';

import { UserPurchasesProvider } from './market-cards/state/UserPurchasesProvider';
import BuyFormProvider from './market-cards/state/BuyFormProvider';
import DiscountBuyCard from './market-cards/discount-buy';
import Card from '@/components/Card';
import Image from 'next/image';

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
            <a
              href="https://docs.theopetralabs.com/on-chain-ecosystem/growth-markets"
              className="underline"
            >
              {' '}
              Learn More
            </a>
          </p>
          <div className=" mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <div className=" flex w-full flex-col space-x-4 md:flex-row">
              <DiscountBuyCard />
              <Card>
                <div className="m-10">
                  <Image
                    src="/assets/images/dashboard/theo-steps.svg"
                    width={330}
                    height={417}
                    alt="steps"
                    className="h-auto w-full max-w-[330px]"
                  />
                </div>
              </Card>
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
