import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { cache } from '@/lib/cache';
import React, { useEffect, useMemo, useState } from 'react';
import { useContractRead, useToken } from 'wagmi';
import { useContractInfo } from '@/hooks/useContractInfo';
import { getContract } from '@wagmi/core';
import { Abi, formatUnits } from 'viem';
import { GroupedBondMarketsMapType, Terms } from './use-buy-form';
export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
  purchaseAmount;
  purchaseCost;
  transactionPending: boolean;
  maxSlippage: number;
};

const initialFormState: formStateType = {
  theoPrice: 100,
  purchaseToken: {
    quoteToken: process.env.NEXT_PUBLIC_ETH_ADDRESS as `0x${string}`,
    address: process.env.NEXT_PUBLIC_ETH_ADDRESS,
    symbol: 'ETH',
  },
  purchaseAmount: 0,
  purchaseCost: 0,
  transactionPending: false,
  maxSlippage: 0.01,
};

export const BuyFormProvider: React.FC = (props) => {
  const [selection, setSelection] = useState<{ label: string; value: number }>({
    label: '',
    value: 0,
  });
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState<GroupedBondMarketsMapType>({});
  const [terms, setTerms] = useState<Terms[]>([]);
  const [formState, setFormState] = useState<formStateType>(initialFormState);
  const [UIBondMarketsIsLoading, setUIBondMarketsIsLoading] = useState(true);
  const { address, abi } = useActiveBondDepo();
  const { data: selectedToken } = useToken({ address: formState.purchaseToken?.quoteToken });
  const selectedMarket = useMemo(() => {
    if (selection.value && Object.keys(groupedBondMarketsMap).length > 0) {
      return groupedBondMarketsMap[selection.value]?.markets.find(
        (x) => x.marketData.quoteToken === formState.purchaseToken?.address
      );
    }
    return undefined;
  }, [selection, groupedBondMarketsMap, formState.purchaseToken?.address]);

  const contract = useMemo(
    () =>
      getContract({
        address,
        abi: abi as Abi,
      }),
    [address, abi]
  );
  const { data: priceInfo } = useContractRead({
    address,
    abi: abi as Abi,
    functionName: 'marketPrice',
    args: [selectedMarket?.id],
  });

  const { address: ChainlinkPriceFeed, abi: ChainlinkPriceFeedAbi } =
    useContractInfo('ChainlinkPriceFeed');
  const { address: calcAddress, abi: calcAbi } = useContractInfo('BondingCalculator');
  const { address: theoERC20address, abi: theoERC20abi } = useContractInfo('TheopetraERC20Token');

  const { data: priceFeed } = useContractRead({
    address: ChainlinkPriceFeed,
    abi: ChainlinkPriceFeedAbi as Abi,
    functionName: 'latestAnswer',
  });

  const { data: valuation } = useContractRead({
    address: calcAddress,
    abi: calcAbi as Abi,
    functionName: 'valuation',
    args: [theoERC20address, 1e9],
  });

  const maxPayout = useMemo(() => {
    if (selectedMarket?.marketData.maxPayout) {
      const max = selectedMarket.marketData.maxPayout; //formatUnits(BigInt(selectedMarket.maxPayout as bigint), 9)
      return Number(max);
    }
    return 0;
  }, [selectedMarket]);

  const valuationPrice = useMemo(() => {
    if (valuation && priceFeed) {
      const price = formatUnits(BigInt(priceFeed as bigint), 8);
      const valuationNumber = formatUnits(BigInt(valuation as bigint), 18);
      const totalValue = Number(valuationNumber) * Number(price);

      return totalValue as number;
    }
    return 0;
  }, [valuation, priceFeed]);

  useEffect(() => {
    const callContract = async () => {
      setUIBondMarketsIsLoading(true);
      const cachedMkts = cache.getItem('groupedBondMarketsMap');

      if (cachedMkts) {
        setGroupedBondMarketsMap(cachedMkts);
        return;
      }

      try {
        const BondMarkets = (await contract.read.liveMarkets()) as any;

        if (BondMarkets) {
          const termsMap = {};
          const getTerms = await Promise.all(
            BondMarkets.map(async (bondMarket) => {
              try {
                const termsValues = (await contract.read.terms([bondMarket])) as any;
                const terms = {
                  fixedTerm: termsValues[0],
                  vesting: termsValues[1],
                  conclusion: termsValues[2],
                  bondRateFixed: termsValues[3],
                  maxBondRateVariable: termsValues[4],
                  discountRateBond: termsValues[5],
                  discountRateYield: termsValues[6],
                  maxDebt: termsValues[7],
                };
                const vestingInMonths = Math.floor(terms.vesting / 60 / 60 / 24 / 30);
                const vestingInMinutes = terms.vesting / 60;
                const vestingTime =
                  process.env.NEXT_PUBLIC_ENV !== 'production' ? vestingInMinutes : vestingInMonths;

                const marketValues = (await contract.read.markets([bondMarket])) as any;
                const market = {
                  capacity: marketValues[0],
                  quoteToken: marketValues[1],
                  capacityInQuote: marketValues[2],
                  sold: marketValues[3],
                  purchased: marketValues[4],
                  totalDebt: marketValues[5],
                  maxPayout: marketValues[6],
                };
                let marketPrice = '';

                try {
                  marketPrice = BigInt(
                    (await contract.read.marketPrice([bondMarket])) as any
                  ).toString();
                } catch {
                  marketPrice = '';
                  console.log('error getting market price');
                }

                const discountRate = BigInt(
                  (await contract.read.bondRateVariable([bondMarket])) as number
                );
                const vestingTimeIncrement =
                  process.env.NEXT_PUBLIC_ENV !== 'production' ? 'minutes' : 'months';
                const termWithMarkets = {
                  mapKey: vestingTime,
                  header: `${vestingTime} ${vestingTimeIncrement}`,
                  terms,
                  vestingTime,
                  vestingTimeIncrement,
                  vestingInMinutes,
                  marketData: {
                    ...market,
                    marketPrice,
                    valuationPrice,
                    discountRate,
                  },
                  id: Number(bondMarket),
                };

                setTerms((prev) => [...prev, termWithMarkets]);
                return termWithMarkets;
              } catch (err) {
                console.log(err);
                return null;
              }
            })
          );
          const termWithLogestDuration = getTerms.reduce((prev, current) =>
            prev.vestingTime > current.vestingTime ? prev : current
          );
          // initialize the form with the longest duration
          setSelection({
            value: termWithLogestDuration.vestingTime,
            label: `${termWithLogestDuration.vestingTime} ${termWithLogestDuration.vestingTimeIncrement}`,
          });

          getTerms.forEach((term) => {
            if (term) {
              const { mapKey, terms, vestingInMonths, marketData, id } = term;

              if (!termsMap[mapKey]) {
                termsMap[mapKey] = {
                  ...term,
                  markets: [],
                };
              }

              termsMap[mapKey].markets.push({ ...terms, marketData, id });
            }
          });

          setGroupedBondMarketsMap(termsMap);
          setUIBondMarketsIsLoading(false);
          // cache.setItem(
          //   'groupedBondMarketsMap',
          //   { ...termsMap },
          //   process.env.NEXT_PUBLIC_GROUPED_BOND_MKTS_CACHE_SECS
          // );
          return null;
        }
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    callContract();

    // Cleanup useEffect
    return () => {
      setGroupedBondMarketsMap({});
      setTerms([]);
    };
  }, [contract]);

  const handleUpdate = (e, fieldName) => {
    const value = e.target.value;
    setFormState({ ...formState, [fieldName]: value });
  };

  const handleTokenInput = (e, fieldName) => {
    const value = e.target.value;
    const quotePrice = priceInfo ? Number(BigInt(priceInfo as string)) / Math.pow(10, 9) : 0;
    const purchaseCostPrecision =
      selectedToken?.symbol === 'WETH' || selectedToken?.symbol === 'ETH' ? 9 : 2;
    const purchaseAmountPrecision =
      selectedToken?.symbol === 'WETH' || selectedToken?.symbol === 'ETH' ? 9 : 2;

    const updateFields: { purchaseCost: string; purchaseAmount: string } = {
      purchaseCost: '',
      purchaseAmount: '',
    };

    if (fieldName === 'purchaseAmount') {
      const purchaseCost = Number(value * quotePrice).toFixed(purchaseCostPrecision);
      updateFields.purchaseCost = purchaseCost;
    } else {
      const purchaseAmount = Number(value / quotePrice).toFixed(purchaseAmountPrecision);
      // this is a fallback. There should always be a quotePrice greater than 0.
      updateFields.purchaseAmount = purchaseAmount;
    }

    updateFields[fieldName] = value;
    setFormState((prevState) => ({
      ...prevState,
      ...updateFields,
    }));
  };

  const getSelectedMarketPrice = () => {
    if (!selectedMarket?.id) return;
    const output = BigInt(Number(priceInfo || 0) / Math.pow(10, 9));
    return selectedToken?.symbol === 'USDC' ? Number(output).toFixed(2) : output;
  };

  useEffect(() => {
    if (selection.value) return;
    if (!terms.length) return;
    setSelection({
      label: `${terms[0].mapKey} ${terms[0].mapKey}`,
      value: terms[0].mapKey,
    });
  }, []);

  const updateFormState = (vals: any) => {
    setFormState({ ...formState, ...vals });
  };

  return (
    <BuyFormContext.Provider
      value={[
        {
          ...formState,
          selectedMarket,
          groupedBondMarketsMap,
          selection,
          setSelection,
          terms,
          UIBondMarketsIsLoading,
          maxPayout,
        },
        { setSelection, updateFormState, handleUpdate, getSelectedMarketPrice, handleTokenInput },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
