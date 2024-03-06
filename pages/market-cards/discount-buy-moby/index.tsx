import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import CurrencyInput from '@/components/CurrencyInput';
import Icon from '@/components/Icons';

import { formatUnits } from 'viem';
import Tooltip from '@/components/Tooltip';
import BuyFormProvider from '../state/BuyFormProvider';
import useBuyForm from '../state/use-buy-form';
import ConfirmBuy from '../components/ConfirmBuy';
import Card from '@/components/Card';
const DataRow = ({ label, value }: { label: string; value: any }) => (
  <div className="flex w-full items-center justify-between text-white">
    <div className="text-sm">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
const DiscountBuyMobyCard = () => {
  const [
    {
      purchaseCost,
      purchaseAmount,
      maxSlippage,
      purchaseToken,
      maxPayoutFormatted,
      selectedMarket,
    },
    { handleUpdate, handleTokenInput },
  ] = useBuyForm();
  const [, { openModal }] = useModal();
  const account = useAccount();
  const { data: balance, isLoading: balanceIsLoading } = useBalance({
    address: account?.address,
    ...(purchaseToken?.symbol === 'USDC' && {
      formatUnits: 'wei',
      token: purchaseToken?.quoteToken,
    }),
  });
  const [error, setError] = useState<string>('');

  const handleCurencyInputChange = (e: BaseSyntheticEvent) => {
    if (Number(e.target.value) < 0) return;
    if (Number(e.target.value) > Number(balance?.formatted)) {
      setError('Insufficient balance');
    } else {
      setError('');
    }
    handleTokenInput(e, 'purchaseCost');
  };

  useEffect(() => {
    if (Number(purchaseAmount) > maxPayoutFormatted) {
      setError('Amount exceeds max payout');
    } else if (
      Number(purchaseAmount) <= 0 ||
      purchaseAmount === 'NaN' ||
      purchaseAmount === 'Infinity'
    ) {
      setError('Please enter a valid amount');
    }
  }, [purchaseCost, purchaseAmount, maxPayoutFormatted]);

  return (
    <Card
      lightModeBgColor="bg-theo-dark-navy"
      darkModeBgColor="bg-theo-dark-navy"
      cardHeader={
        <div className="w-full text-center text-2xl font-bold text-white">24/7 MicroSpaces</div>
      }
    >
      <>
        <div className="mb-4 flex w-full flex-col">
          {[
            { label: 'Units Owned', value: '4 Units' },
            { label: 'Avg. Cost/Unit', value: '$5,500' },
            { label: 'Avg. Net Rent*', value: '$150-200 / MO' },
            { label: 'Lock Period', value: '24 Hours' },
          ].map((item) => (
            <DataRow key={item.label} {...item} />
          ))}
        </div>
        <CurrencyInput
          className={'mb-2'}
          selectedToken={{ ...purchaseToken }}
          isDiscountBuy={true}
          maxPayout={
            selectedMarket
              ? Number(
                  formatUnits(
                    BigInt(
                      Number(selectedMarket.marketData.marketPrice) *
                        Number(selectedMarket.marketData.maxPayout)
                    ),
                    18
                  )
                )
              : 0
          }
          balance={balanceIsLoading ? '0' : balance?.formatted}
          value={purchaseCost}
          onCurrencyChange={(e: BaseSyntheticEvent) => {
            handleUpdate(e, 'purchaseToken');
            handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
          }}
          onChange={handleCurencyInputChange}
        />
        <div className="space-between mb-4 flex align-middle">
          <label htmlFor="maxSlippage" className="space-between color w-full flex-1 text-gray-200 ">
            Max Slippage &nbsp;
            <Tooltip size="small">
              {
                'Slippage sets the maximum difference between the purchase sent by the user, and the amount of tokens the user receives in return. \n In the time it takes a transaction to settle on Ethereum, the discount rate may have changed due to interactions with other users, resulting in a different payout than expected.'
              }
            </Tooltip>
          </label>
          <div className="rounded border bg-gray-100 pr-4 text-right ">
            <input
              name="maxSlippage"
              value={maxSlippage * 100}
              onChange={(e: BaseSyntheticEvent) => {
                if (Number(e.target.value) < 0) return;
                handleUpdate({ target: { value: e.target.value / 100 } }, 'maxSlippage');
              }}
              placeholder="00.00"
              className="pr-1 text-right hover:appearance-none focus:outline-none"
              onKeyPress={(event) => {
                if (!/^\d*\.?\d*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <span className="bg-gray-100 text-gray-400">%</span>
          </div>
        </div>
        <button
          className={`border-button w-full ${error && 'cursor-not-allowed opacity-50'} mt-4`}
          disabled={Boolean(error?.length)}
          onClick={() => openModal(<ConfirmBuy bondDepoName="MobyBondDepository" />)}
        >
          {Boolean(error?.length) ? (
            error
          ) : (
            <>
              <Icon name={'theo'} className="mr-2 w-8" />
              Purchase {purchaseAmount} THEO
            </>
          )}
        </button>
        <div className="text-xs text-gray-400">
          *Based on a $6k Purchase Price. Purchase price may vary. All Prices in USD
        </div>
      </>
    </Card>
  );
};

export default DiscountBuyMobyCard;
