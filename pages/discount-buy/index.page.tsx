import PageContainer from '@/components/PageContainer';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, useMemo } from 'react';
import BuyFormProvider from './state/BuyFormProvider';
import useBuyForm from './state/use-buy-form';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import { useAccount, useBalance } from 'wagmi';
import CurrencyInput from '@/components/CurrencyInput';
import SimpleSelect from '@/components/SimpleSelect';
import Icon from '@/components/Icons';
import Table from '@/components/Table';
import { TokenInfo } from '@/components/TokenName';

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
    },
    { handleUpdate, handleTokenInput },
  ] = useBuyForm();
  const { data: account } = useAccount();
  const { data: balance, isLoading: balanceIsLoading } = useBalance({
    addressOrName: account?.address,
    ...(purchaseToken?.symbol === 'USDC' && {
      formatUnits: 'mwei',
      token: purchaseToken?.quoteToken,
    }),
  });

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
        Header: 'Token',
        accessor: 'token',
        id: 'token',
        width: '10%',
        Cell: ({ value }) => TokenInfo(value)?.symbol,
      },
      {
        Header: 'Valuation',
        accessor: 'valuation',
        id: 'valuation',
        width: '10%',
      },
      {
        Header: 'Discount Rate',
        accessor: 'discountRate',
        id: 'discountRate',
        width: '10%',
      },
      {
        Header: 'Market Price',
        accessor: 'marketPrice',

        id: 'marketPrice',
        width: '10%',
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
              className="rounded-lg bg-[#ebebeb] p-2"
              onClick={() => handleBuyClick(value, cell, symbol)}
            >
              Buy THEO
            </button>
          );
        },
      },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      allTermedMarkets.map((y) => {
        return {
          duration: `${y.mapKey} ${y.vestingTimeIncrement}`,
          token: y.marketData.quoteToken,
          valuation: y.marketData.valuation,
          discountRate: y.marketData.discountRate,
          marketPrice: y.marketData.marketPrice,
          marketData: y.marketData,
          select: {
            label: `${y.mapKey} ${y.vestingTimeIncrement}`,
            value: `${y.mapKey}`,
          },
        };
      }),

    [allTermedMarkets]
  );

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="w-full rounded-lg bg-white p-4 shadow-lg sm:w-3/4">
          <div className="mb-4 flex justify-between rounded-lg bg-[#ebebeb] p-2 dark:bg-theo-dark-navy sm:items-center">
            <span className=" flex  items-center truncate text-lg font-bold uppercase sm:text-2xl">
              Term
            </span>
            <SimpleSelect
              options={Object.entries(groupedBondMarketsMap).map(([key, value]: [string, any]) => ({
                label: value.header,
                value: key,
              }))}
              selected={{
                label: selection?.label,
                value: selection?.value,
              }}
              onChange={(value) => {
                setSelection(value);
              }}
            />
          </div>
          <CurrencyInput
            className={'mb-2'}
            selectedToken={{ ...purchaseToken }}
            options={groupedBondMarketsMap[selection?.value]?.markets
              .filter((m) =>
                [
                  process.env.NEXT_PUBLIC_USDC_ADDRESS,
                  process.env.NEXT_PUBLIC_ETH_ADDRESS,
                ].includes(m.marketData.quoteToken)
              )
              .map((x) => ({ ...x.marketData }))}
            balance={balanceIsLoading ? '0' : balance?.formatted}
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
          <button className="border-button w-full">
            <Icon name={'theo'} className="mr-2 w-8" />
            Purchase {purchaseAmount} THEO
          </button>
        </div>
        <div className="mt-6 w-full rounded-lg pt-4">
          <div className="mb-4 text-xl font-bold">All Markets</div>
          <Table columns={columns} data={tableData} />
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
