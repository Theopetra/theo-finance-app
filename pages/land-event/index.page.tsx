import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';

import { UserPurchasesProvider } from '../market-cards/state/UserPurchasesProvider';
import LandEventCard from '../market-cards/land-event';
import BuyFormProvider from '../market-cards/state/BuyFormProvider';

const LandEvent = ({}) => {
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav items={[{ href: '/your-purchases', name: 'Your Purchases' }]} />
      </div>
      <PageContainer>
        <div className="mt-4">
          <p className=" mb-4 dark:text-white"></p>
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <div className="flex w-full grid-cols-2 space-x-4">
              <LandEventCard />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

LandEvent.PageStateProvider = (props) => (
  <UserPurchasesProvider {...props}>
    {/* // TODO: Update to land event depo name */}
    <BuyFormProvider {...props} bondDepoName="MobyBondDepository" />
  </UserPurchasesProvider>
);

LandEvent.PageHead = () => {
  return <div>Land Event</div>;
};

export default LandEvent;
