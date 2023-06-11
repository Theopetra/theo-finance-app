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
import { formatTheo } from '@/lib/format_theo';
import { formatEther } from 'viem';
import { parseEther } from 'viem';

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
      allTermedMarkets,
      UIBondMarketsIsLoading,
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
  const [error, setError] = useState<string>();
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
        Header: 'Duration',
        accessor: 'duration',
        id: 'duration',
        width: '10%',
      },

      {
        Header: 'Valuation',
        accessor: 'valuationPrice',
        id: 'valuation',
        width: '10%',
        Cell: ({ value }) => formatTheo(value),
      },
      {
        Header: 'Discount Rate',
        accessor: 'discountRate',
        id: 'discountRate',
        width: '10%',
        // value is a large percent value and needs to be converted to percentage.
        Cell: ({ value }) => (
          <span title={`${value / BigInt(10 ** 7)}`}>{(value / BigInt(10 ** 7)).toString()}%</span>
        ),
      },
      {
        Header: 'Market Price',
        accessor: 'marketPrice',
        id: 'marketPrice',
        width: '10%',
        Cell: ({ value, cell }) => {
          return `${formatEther(value)} ETH`;
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
              Set Market
            </button>
          );
        },
      },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      allTermedMarkets
        ? allTermedMarkets.map((y) => {
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

    [allTermedMarkets]
  );
  useEffect(() => {
    if (Number(purchaseAmount) <= 0 || purchaseAmount === 'NaN' || purchaseAmount === 'Infinity') {
      setError('Please enter a valid amount');
    } else {
      setError('');
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
        <div className="w-full rounded-lg bg-white p-4 shadow-lg sm:w-3/4 xl:w-1/2">
          <div className="mb-4 flex justify-between rounded-lg bg-[#ebebeb] p-2 dark:bg-theo-dark-navy sm:items-center">
            <span className=" flex  items-center truncate text-lg font-bold uppercase sm:text-2xl">
              Term
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
            onChange={(e: BaseSyntheticEvent) => {
              if (Number(e.target.value) < 0) return;
              if (Number(e.target.value) > Number(balance?.formatted)) {
                setError('Insufficient balance');
              } else {
                setError('');
              }
              handleTokenInput(e, 'purchaseCost');
            }}
          />

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

          <button
            className={`border-button w-full ${error && 'cursor-not-allowed opacity-50'}`}
            disabled={Boolean(error?.length)}
            // onClick={() => openModal(<ConfirmBuy />)}
          >
            {error ? (
              error
            ) : (
              <>
                <Icon name={'theo'} className="mr-2 w-8" />
                Purchase {purchaseAmount} THEO
              </>
            )}
          </button>
        </div>
        <div className="mt-6 w-full rounded-lg pt-4">
          <div className="mb-4 text-xl font-bold">All Markets</div>
          {!UIBondMarketsIsLoading ? (
            <Table columns={columns} data={tableData} />
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
