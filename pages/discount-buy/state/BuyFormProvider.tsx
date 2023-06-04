import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { cache } from '@/lib/cache';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BigNumber } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { useContract, useContractRead, useProvider, useToken } from 'wagmi';

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
    quoteToken: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    symbol: 'USDC',
  },
  purchaseAmount: 0,
  purchaseCost: 0,
  transactionPending: false,
  maxSlippage: 0.01,
};

export const BuyFormProvider: React.FC = (props) => {
  const [selection, setSelection] = useState<{ label: string; value: string }>({
    label: '',
    value: '',
  });
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState({});
  const [allTermedMarkets, setAllTermedMarkets] = useState<any[]>([]);
  const [formState, setFormState] = useState<formStateType>(initialFormState);
  const { address, abi } = useActiveBondDepo();
  const provider = useProvider();
  const { data: selectedToken } = useToken({ address: formState.purchaseToken?.quoteToken });
  const selectedMarket = useMemo(
    () =>
      selection &&
      groupedBondMarketsMap[selection.value]?.markets.find(
        (x) => x.marketData.quoteToken === formState.purchaseToken?.address
      ),
    [selection, formState.purchaseToken?.address]
  );

  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  const { data: priceInfo } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'marketPrice',
    { args: selectedMarket?.id || BigNumber.from(0), cacheTime: cache.cacheTimesInMs.prices }
  );

  useEffect(() => {
    async function callContract() {
      const cachedMkts = cache.getItem('groupedBondMarketsMap');

      if (cachedMkts) {
        setGroupedBondMarketsMap(cachedMkts);
        return;
      }

      try {
        const BondMarkets = await contract.liveMarkets();

        if (BondMarkets) {
          const termsMap = {};
          const setTerms = await Promise.all(
            BondMarkets.map(async (bondMarket) => {
              try {
                const terms = await contract.terms(bondMarket);
                const vestingInMonths = Math.floor(terms.vesting / 60 / 60 / 24 / 30);
                const vestingInMinutes = terms.vesting / 60;
                const mapKey =
                  process.env.NEXT_PUBLIC_ENV !== 'production' ? vestingInMinutes : vestingInMonths;

                const market = await contract.markets(bondMarket);
                const marketPrice = 0;
                const valuationPrice = 0;
                // const marketPrice = BigNumber.from(
                //   await contract.marketPrice(bondMarket)
                // ).toNumber();
                // const valuationPrice = BigNumber.from(
                //   await contract.bondRateVariable(bondMarket)
                // ).toNumber();
                const termWithMarkets = {
                  mapKey,
                  terms,
                  vestingInMonths,
                  vestingInMinutes,
                  marketData: Object.assign({}, { ...market, marketPrice, valuationPrice }),
                  id: bondMarket.toString(),
                };
                setAllTermedMarkets((prev) => [...prev, termWithMarkets]);
                return termWithMarkets;
              } catch (err) {
                console.log(err);
                return null;
              }
            })
          );

          setTerms.forEach((term) => {
            if (term) {
              const { mapKey, terms, vestingInMonths, marketData, id } = term;

              if (!termsMap[mapKey]) {
                termsMap[mapKey] = {
                  header: `${mapKey} minutes`,
                  highlight: vestingInMonths === 18,
                  markets: [],
                };
              }

              termsMap[mapKey].markets.push({ ...terms, marketData, id });
            }
          });

          setGroupedBondMarketsMap(termsMap);

          cache.setItem(
            'groupedBondMarketsMap',
            Object.assign({}, termsMap),
            process.env.NEXT_PUBLIC_GROUPED_BOND_MKTS_CACHE_SECS
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    callContract();
  }, [contract]);

  const groupedBondMarkets = useMemo(() => {
    const allTermedMarkets: any = Object.values(groupedBondMarketsMap);

    return allTermedMarkets.sort((a: any, b: any) => a.header - b.header);
  }, [groupedBondMarketsMap]);

  const handleUpdate = (e, fieldName) => {
    const value = e.target.value;

    setFormState({ ...formState, [fieldName]: value });
  };

  const handleTokenInput = (e, fieldName) => {
    const value = e.target.value;
    const quotePrice = priceInfo ? BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9) : 0;
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
    const output = (BigNumber.from(priceInfo || 0).toNumber() / Math.pow(10, 9)).toFixed(9);
    return selectedToken?.symbol === 'USDC' ? Number(output).toFixed(2) : output;
  };

  useEffect(() => {
    setFormState(initialFormState);
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
          groupedBondMarkets,
          groupedBondMarketsMap,
          selection,
          setSelection,
          allTermedMarkets,
        },
        { setSelection, updateFormState, handleUpdate, getSelectedMarketPrice, handleTokenInput },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
