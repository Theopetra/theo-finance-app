import PageContainer from '@/components/PageContainer';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import BuyFormProvider from './state/BuyFormProvider';
import useBuyForm from './state/use-buy-form';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { useAccount, useBalance } from 'wagmi';
import CurrencyInput from '@/components/CurrencyInput';
import SimpleSelect from '@/components/SimpleSelect';
import Icon from '@/components/Icons';
import Table from '@/components/Table';
import { TokenInfo } from '@/components/TokenName';
import ConfirmBuy from './components/ConfirmBuy';
import { UserPurchasesProvider } from './state/UserPurchasesProvider';
import Skeleton from 'react-loading-skeleton';
import { TokenPrice } from '@/components/TokenPrice';
import { cleanSymbol } from '@/lib/clean_symbol';

const DiscountBuy = () => {
  const [
    {
      purchaseCost,
      purchaseAmount,
      maxSlippage,
      purchaseToken,
      selection,
      setSelection,
      groupedBondMarketsMap,
      terms,
      UIBondMarketsIsLoading,
      maxPayout,
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
  const handleBuyClick = (value, cell, symbol) => {
    setSelection(value);
    handleUpdate(
      {
        target: {
          value: {
            address: cell.row.original.token,
            quoteToken: cell.row.original.token,
            symbol,
          },
        },
      },
      'purchaseToken'
    );
    handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Lock time',
        accessor: 'duration',
        id: 'duration',
        width: '10%',
        defaultCanSort: true,
      },

      {
        Header: '$THEO Price',
        accessor: 'valuationPrice',
        id: 'valuation',
        width: '10%',
        Cell: ({ value }) => `$${Math.round(value * 10000) / 10000}`,
      },
      {
        Header: 'Discount Rate',
        accessor: 'discountRate',
        id: 'discountRate',
        width: '10%',
        // value is a large percent value and needs to be converted to percentage.
        Cell: ({ value }) => (
          <span title={`${value / BigInt(10 ** 7)}`}>
            {Number(value / BigInt(10 ** 7)).toFixed(2)}%
          </span>
        ),
      },
      {
        Header: 'Discount Price',
        accessor: 'marketPrice',
        id: 'marketPrice',
        width: '10%',
        Cell: ({ value, cell }) => {
          return (
            <>
              <TokenPrice market={selectedMarket} /> {cleanSymbol(purchaseToken?.symbol)}
            </>
          );
        },
      },
      {
        Header: '',
        accessor: 'select',
        id: 'select',
        width: '10%',
        Cell: ({ value, cell }) => {
          const symbol = TokenInfo(cell.row.original.token)?.symbol;
          return (
            <button
              key={`${value.value}_${symbol}`}
              className="border-button"
              disabled={!symbol}
              onClick={() => handleBuyClick(value, cell, symbol)}
            >
              Select
            </button>
          );
        },
      },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      terms
        ? terms.map((y) => {
            return {
              duration: `${y.mapKey} ${y.vestingTimeIncrement}`,
              token: y.marketData.quoteToken,
              valuationPrice: y.marketData.valuationPrice,
              discountRate: y.marketData.discountRate,
              marketPrice: y.marketData.marketPrice,
              marketData: y.marketData,
              select: {
                label: `${y.mapKey} ${y.vestingTimeIncrement}`,
                value: `${y.mapKey}`,
              },
            };
          })
        : [],

    [terms]
  );

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
    if (Number(purchaseAmount) > maxPayout) {
      setError('Amount exceeds max payout');
    } else if (
      Number(purchaseAmount) <= 0 ||
      purchaseAmount === 'NaN' ||
      purchaseAmount === 'Infinity'
    ) {
      setError('Please enter a valid amount');
    }
  }, [purchaseCost, purchaseAmount]);

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="flex flex-col items-center sm:flex-row">
          <div className="w-full rounded-lg bg-white p-4 shadow-lg sm:w-3/4 xl:w-1/2">
            <div className="mb-4 flex justify-between rounded-lg bg-[#ebebeb] p-2 dark:bg-theo-dark-navy sm:items-center">
              <span className=" truncate-base  flex items-center text-lg font-bold ">
                Choose lockup time
              </span>
              {Object.entries(groupedBondMarketsMap).length > 0 ? (
                <SimpleSelect
                  options={Object.entries(groupedBondMarketsMap).map(
                    ([key, value]: [string, any]) => ({
                      label: value.header,
                      value: key,
                    })
                  )}
                  selected={{
                    label: selection?.label,
                    value: selection?.value,
                  }}
                  onChange={(value) => {
                    setSelection(value);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <CurrencyInput
              className={'mb-2'}
              selectedToken={{ ...purchaseToken }}
              balance={balanceIsLoading ? '0' : balance?.formatted}
              value={purchaseCost}
              onCurrencyChange={(e: BaseSyntheticEvent) => {
                handleUpdate(e, 'purchaseToken');
                handleTokenInput({ target: { value: 0 } }, 'purchaseCost');
              }}
              onChange={handleCurencyInputChange}
            />
            <div className="space-between mb-4 flex align-middle">
              <label htmlFor="maxSlippage" className="color w-full flex-1 text-gray-400 ">
                Max Slippage
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
              className={`border-button w-full ${error && 'cursor-not-allowed opacity-50'}`}
              disabled={Boolean(error?.length)}
              onClick={() => openModal(<ConfirmBuy />)}
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
          </div>
          {/* info box */}
          <div className="bg- ml-6 max-w-sm rounded-xl bg-gray-200 p-6 text-sm text-gray-500">
            When you discount buy, your $THEO is locked for a period of time before you can claim
            them. The longer the lock time, the larger the discount.
          </div>
        </div>
        <div className="mt-6 w-full rounded-lg pt-4">
          <div className="mb-4 text-xl font-bold">Discount Buy Options</div>
          {!UIBondMarketsIsLoading ? (
            <Table
              columns={columns}
              data={tableData}
              initialState={{
                sortBy: [
                  {
                    id: 'duration',
                    desc: true,
                  },
                ],
              }}
            />
          ) : (
            <Skeleton height={30} count={5} />
          )}
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
