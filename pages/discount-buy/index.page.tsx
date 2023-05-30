import PageContainer from '@/components/PageContainer';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, Fragment, useMemo } from 'react';
import BuyFormProvider from './state/BuyFormProvider';
import useBuyForm from './state/use-buy-form';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { useAccount, useBalance } from 'wagmi';
import CurrencyInput from '@/components/CurrencyInput';
import SimpleSelect from '@/components/SimpleSelect';

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
  const [
    {
      purchaseCost,
      purchaseAmount,
      maxSlippage,
      purchaseToken,
      selection,
      setSelection,
      groupedBondMarketsMap,
      selectedTerm,
    },
    { handleUpdate, getSelectedMarketPrice, handleTokenInput },
  ] = useBuyForm();
  const { data: account, isError: accountIsError, isLoading: accountIsLoading } = useAccount();
  const {
    data: balance,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
  } = useBalance({
    addressOrName: account?.address,
    ...(purchaseToken?.symbol === 'USDC' && {
      formatUnits: 'mwei',
      token: purchaseToken?.quoteToken,
    }),
  });
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="w-full rounded-lg bg-white p-4 shadow-lg sm:w-1/2">
          <CurrencyInput
            className={'mb-2'}
            selectedToken={{ ...purchaseToken }}
            options={selectedTerm?.markets
              .filter((m) =>
                [
                  process.env.NEXT_PUBLIC_USDC_ADDRESS,
                  process.env.NEXT_PUBLIC_ETH_ADDRESS,
                ].includes(m.marketData.quoteToken)
              )
              .map((x) => ({ ...x.marketData }))}
            balance={balance?.formatted}
            value={purchaseCost}
            onCurrencyChange={(e: BaseSyntheticEvent) => {
              handleUpdate(e, 'purchaseToken');
              handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
            }}
            onChange={(e: BaseSyntheticEvent) => {
              if (Number(e.target.value) < 0) return;
              handleTokenInput(e, 'purchaseCost');
            }}
          />
          <div
            className={`flex justify-between rounded-lg bg-[#ebebeb]  p-2 dark:bg-theo-dark-navy sm:items-center`}
          >
            <span className=" flex  items-center truncate text-lg font-bold uppercase sm:text-2xl">
              Term
            </span>
            <SimpleSelect
              options={Object.keys(groupedBondMarketsMap).map((x) => ({
                label: x,
                value: x,
              }))}
              selected={{
                label: selection?.selectedBondDuration,
                value: selection?.selectedBondDuration,
              }}
              onChange={(value) => {
                setSelection(value);
              }}
            />
          </div>
          <div className="space-between mb-4 flex align-middle">
            <label htmlFor="maxSlippage" className="color w-full flex-1 text-gray-400 ">
              Max Slippage
            </label>
            <input
              name="maxSlippage"
              value={maxSlippage}
              onChange={(e: BaseSyntheticEvent) => {
                if (Number(e.target.value) < 0) return;
                handleUpdate(e, 'maxSlippage');
              }}
              className="rounded border bg-transparent pr-2 text-right hover:appearance-none focus:outline-none"
              placeholder="00.00"
              onKeyPress={(event) => {
                if (!/^\d*\.?\d*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <CurrencyInput
            selectedToken={{ symbol: 'THEO' }}
            value={purchaseAmount}
            onChange={(e: BaseSyntheticEvent) => handleTokenInput(e, 'purchaseAmount')}
          />
        </div>
      </PageContainer>
    </>
  );
};

DiscountBuy.PageStateProvider = (props) => <BuyFormProvider {...props} />;
DiscountBuy.PageHead = () => {
  return <div>Discount Buy</div>;
};

export default DiscountBuy;
