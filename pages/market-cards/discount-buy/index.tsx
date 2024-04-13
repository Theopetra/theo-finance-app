import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import useBuyForm from '../state/use-buy-form';
import { useAccount, useBalance } from 'wagmi';
import { watchPendingTransactions } from '@wagmi/core';
import CurrencyInput from '@/components/CurrencyInput';
import ConfirmBuy from '../components/ConfirmBuy';
import { formatUnits } from 'viem';
import Tooltip from '@/components/Tooltip';
import Card from '@/components/Card';
import Icon from '@/components/Icons';
import ProgressBar from '@/components/ProgressBar';

const DataRow = ({ label, value }: { label: string; value: any }) => (
  <div className="my-2 flex w-full items-center justify-between">
    <div className="text-xl">{label}</div>
    <div className=" text-xl font-bold leading-none">{value}</div>
  </div>
);

const DiscountBuyCard = () => {
  const [
    {
      purchaseCost,
      purchaseAmount,
      maxSlippage,
      startingPrice,
      pricePerTheo,
      purchaseToken,
      UIBondMarketsIsLoading,
      maxPayoutFormatted,
      selectedMarket,
      unitProgress,
    },
    { handleUpdate, handleTokenInput },
  ] = useBuyForm();
  const [, { openModal }] = useModal();
  const account = useAccount();
  const { data: balance, isLoading: balanceIsLoading, refetch } = useBalance({
    address: account?.address,
    ...(purchaseToken?.symbol === 'USDC' && {
      formatUnits: 'wei',
      token: purchaseToken?.quoteToken,
    }),
  }); 
  const [error, setError] = useState<string>('');
 
  useEffect(() => {
    watchPendingTransactions({}, (transactions) =>
    refetch(),
  );
  })
  

  const handleCurencyInputChange = (e: BaseSyntheticEvent) => {
    console.log(e.target.value);
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
    } else if (Number(startingPrice) * Number(1 + maxSlippage) < (pricePerTheo * 10**9)) {
      setError('Purchase exceeds slippage settings');
    } else if (
      Number(purchaseAmount) <= 0 ||
      purchaseAmount === 'NaN' ||
      purchaseAmount === 'Infinity'
    ) {
      setError('Please enter a valid amount');
    }
  }, [startingPrice, purchaseCost, purchaseAmount, maxPayoutFormatted, maxSlippage]);

  return (
    <Card
      darkModeBgColor="bg-theo-dark-navy"
      cardHeader={<div className="w-full text-center text-2xl font-bold">Affordable Housing</div>}
    >
      <>
        <div className="mb-4 flex w-full flex-col">
          {[
            { label: 'Units Owned', value: '1 Unit' },
            { label: 'Avg. Cost/Unit', value: '$150,000+' },
            { label: 'Avg. Net Rent*', value: '$750-1000 / Month' },
            { label: 'Lock Period', value: '7 Days' },
            {
              label: 'Next Unit Progress',
              value: <ProgressBar progress={unitProgress}></ProgressBar>,
            },
          ].map((item) => (
            <DataRow key={item.label} {...item} />
          ))}
        </div>
        <CurrencyInput
          className={'mb-2'}
          selectedToken={{ ...purchaseToken }}
          isDiscountBuy={true}
          maxPayout={selectedMarket ? Number(formatUnits(BigInt(maxPayoutFormatted), 18)) : 0}
          balance={balanceIsLoading ? '0' : balance?.formatted}
          value={purchaseCost}
          onCurrencyChange={(e: BaseSyntheticEvent) => {
            handleUpdate(e, 'purchaseToken');
            handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
          }}
          onChange={handleCurencyInputChange}
        />
        <div className="space-between mb-4 flex align-middle">
          <label htmlFor="maxSlippage" className="space-between color w-full flex-1 text-gray-400 ">
            Max Slippage &nbsp;
            <Tooltip size="small">
              {
                'Slippage sets the maximum difference between the purchase sent by the user, and the amount of tokens the user receives in return. \n In the time it takes a transaction to settle on Ethereum, the final price may have changed due to interactions with other users, resulting in a different payout than expected.'
              }
            </Tooltip>
          </label>
          <div className="rounded border bg-transparent pr-4 text-right ">
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
            <span className="text-gray-400">%</span>
          </div>
        </div>
        {UIBondMarketsIsLoading}{' '}
        <button
          className={`border-button w-full ${error && 'cursor-not-allowed opacity-50'} mt-4`}
          disabled={Boolean(error?.length)}
          onClick={() => openModal(<ConfirmBuy bondDepoName="PublicPreListBondDepository" />)}
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
          *Based on a $150K purchase price. Purchase price may vary. All prices are in USD. 
        </div>
      </>
    </Card>
  );
};

export default DiscountBuyCard;
