import CurrencyInput from '@/components/CurrencyInput';
import Icon from '@/components/Icons';
import { TokenInfo } from '@/components/TokenName';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { add, format } from 'date-fns';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import useBuyForm from '../state/use-buy-form';
import ConfirmBuy from './ConfirmBuy';

const DiscountBuyForm: React.FC<{ title? }> = ({ title }) => {
  const [, { openModal, closeModal }] = useModal();
  const [errorMessage, setErrorMessage] = useState('');
  const [
    { purchaseCost, purchaseAmount, purchaseToken, selection, selectedMarket, bondMarkets },
    { handleUpdate, getSelectedMarketPrice, handleTokenInput },
  ] = useBuyForm();

  const { data: account, isError: accountIsError, isLoading: accountIsLoading } = useAccount();
  // TODO: fix balance for quote token
  const {
    data: balance,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
  } = useBalance({
    addressOrName: account?.address,
    ...(purchaseToken?.symbol === 'USDC' && { formatUnits: 'mwei' }),
    token: purchaseToken?.quoteToken,
  });

  const initialToken = TokenInfo(bondMarkets?.markets[0].marketData.quoteToken);
  const handleClick = () => {
    if (Number(purchaseAmount) <= 0 || Number(purchaseCost) <= 0) {
      setErrorMessage('Purchase amount is required.');
      return;
    }
    openModal(<ConfirmBuy />);
  };
  useEffect(() => {
    handleUpdate(
      {
        target: {
          value: {
            ...bondMarkets?.markets?.[0].marketData,
            ...initialToken,
          },
        },
      },
      'purchaseToken'
    );
  }, [initialToken, bondMarkets?.markets?.[0].marketData]);

  useEffect(() => {
    if (balance && Number(purchaseCost) > Number(balance?.formatted)) {
      setErrorMessage('Insufficient balance.');
      return;
    }
    setErrorMessage('');
  }, [balance, purchaseCost]);

  return (
    <div>
      <div className="flex w-full justify-between">
        <div>
          <button onClick={() => closeModal()} className="text-theo-cyan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 sm:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div
          className="mb-8 text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-3xl font-bold sm:text-4xl">
            {title ? title : 'Discount Buy'}
          </div>
          <div>Review carefully, this purchase is final</div>
        </div>
        <div>
          <Icon name="intersect" className="w-8  dark:text-white sm:w-12" />
        </div>
      </div>
      <div className="mb-2 flex justify-between rounded-2xl bg-white p-2 text-center text-theo-navy dark:bg-black dark:text-white sm:p-6">
        <div>
          <div className="text-lg font-bold capitalize leading-8 sm:text-xl">
            {selection?.purchaseType}
          </div>
          <div className="text-xs">Purchase Type</div>
        </div>
        <div>
          <div className="text-lg font-bold leading-8 sm:text-xl ">{getSelectedMarketPrice()}</div>
          <div className="text-xs">Discounted Price </div>
        </div>
        <div>
          <div className="text-lg font-bold leading-8 sm:text-xl ">
            <Icon name="lock-laminated" className="mr-2 h-4 w-4 " />
            {bondMarkets?.header}-Months
          </div>
          <div className="text-xs">
            Unlocked {format(add(new Date(), { months: bondMarkets?.header }), 'MM-dd-yy')}
          </div>
        </div>
      </div>
      <div className="mb-7 rounded-2xl bg-white p-3 text-theo-navy dark:bg-black dark:text-white sm:p-6">
        <div className="flex items-center text-xl font-bold leading-8">
          ETH/USDC{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-2 inline-block h-6 w-6 text-theo-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          THEO
        </div>
        <p className="mb-8 text-xs">
          Important: New bonds are auto-staked (accrue rebase rewards) and no longer vest linearly
        </p>
        <CurrencyInput
          className={'mb-4'}
          selectedToken={{ ...purchaseToken }}
          options={bondMarkets?.markets
            .filter((m) =>
              [process.env.NEXT_PUBLIC_USDC_ADDRESS, process.env.NEXT_PUBLIC_ETH_ADDRESS].includes(
                m.marketData.quoteToken
              )
            )
            .map((x) => ({ ...x.marketData }))}
          balance={Number(balance?.formatted).toFixed(2)}
          value={purchaseCost}
          onCurrencyChange={(e: BaseSyntheticEvent) => {
            handleUpdate(e, 'purchaseToken');
            handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
          }}
          onChange={(e: BaseSyntheticEvent) => handleTokenInput(e, 'purchaseCost')}
        />
        <CurrencyInput
          selectedToken={{ symbol: 'THEO' }}
          value={purchaseAmount}
          onChange={(e: BaseSyntheticEvent) => handleTokenInput(e, 'purchaseAmount')}
        />
        <div className="text-right text-sm text-red-500"> {errorMessage}</div>
      </div>

      <div className="flex w-full flex-col items-center justify-end sm:flex-row">
        <div className="w-full sm:w-1/2">
          <button
            className="border-button w-full disabled:pointer-events-none disabled:opacity-50 "
            disabled={Boolean(errorMessage)}
            onClick={handleClick}
          >
            Buy Theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBuyForm;
