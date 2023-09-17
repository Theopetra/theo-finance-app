import PageContainer from '@/components/PageContainer';
import BuyFormProvider from './state/BuyFormProvider';
import HorizontalSubNav from '@/components/HorizontalSubNav';

import { UserPurchasesProvider } from './state/UserPurchasesProvider';
import { useTheme } from '@/state/ui/theme';
import Logo from '@/components/Navigation/Logo';
const DiscountBuy = () => {
  const [{ theme }] = useTheme();

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="flex flex-col items-center sm:flex-row">
          <div className="flex w-full flex-col content-center items-center space-y-10 rounded-lg bg-white p-4 shadow-lg">
            <Logo />
            <div className="text-center">
              Theopetra is going through a Tokenomic Upgrade. Discount buys will return shortly
            </div>
          </div>
          <div className="mt-6 w-full rounded-lg pt-4"></div>
        </div>
      </PageContainer>
    </>
  );
};

DiscountBuy.PageStateProvider = (props) => (
  <UserPurchasesProvider {...props}>
    <BuyFormProvider {...props} />
  </UserPurchasesProvider>
);
DiscountBuy.PageHead = () => {
  return <div>Discount Buy</div>;
};

export default DiscountBuy;
