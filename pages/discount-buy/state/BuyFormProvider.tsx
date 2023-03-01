import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { add } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useBalance, useContract, useContractRead, useProvider, useToken } from 'wagmi';

export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
  purchaseAmount;
  purchaseCost;
  transactionPending: boolean;
};

type Selection = {
  label: string;
  value: string | number;
};

type SelectionType = {
  level?: Selection;
  discount?: Selection;
  buyWith?: Selection;
  bondPrice?: Selection;
  lockDuration?: Selection;
  selectedBondDuration?;
};

const initialFormState: formStateType = {
  theoPrice: 100,
  purchaseToken: null,
  purchaseAmount: 0,
  purchaseCost: 0,
  transactionPending: false,
};

export const BuyFormProvider: React.FC = (props) => {
  const [selection, setSelection] = useState<SelectionType>();
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState({});
  const [{ isOpen }] = useModal();

  const [formState, setFormState] = useState<formStateType>(initialFormState);
  const { address, abi } = useActiveBondDepo();
  const provider = useProvider();
  const { data: token } = useToken({ address: formState.purchaseToken?.quoteToken });

  const bondMarkets = groupedBondMarketsMap[selection?.selectedBondDuration];
  const selectedMarket = bondMarkets?.markets.find(
    (x) => x.marketData.quoteToken === formState.purchaseToken?.address
  );

  //Temporarily hardcoding address for debugging
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
    'calculatePrice',
    { args: selectedMarket?.id || BigNumber.from(0), cacheTime: cache.cacheTimesInMs.prices }
  );

  useEffect(() => {
    async function callContract() {
      const cachedMkts = cache.getItem('groupedBondMarketsMap');
      if (cachedMkts) {
        setGroupedBondMarketsMap(cachedMkts);
      } else {
        const WhitelistBondMarkets = await contract.liveMarkets();

        const termsMap = {};
        if (WhitelistBondMarkets) {
          const setTerms =
            WhitelistBondMarkets?.map(
              async (bondMarket) =>
                await contract
                  .terms(bondMarket)
                  .then(async (terms) => {
                    const vestingInMonths = Math.floor(terms.vesting / 60 / 60 / 24 / 30);
                    const mapKey = vestingInMonths;

                    const market = await contract.markets(bondMarket).then((market) => market);

                    return (termsMap[mapKey] = {
                      header: mapKey,
                      highlight: vestingInMonths === 18,
                      markets: [
                        ...(termsMap?.[mapKey] ? termsMap?.[mapKey].markets : []),
                        {
                          ...terms,
                          marketData: Object.assign({}, market),
                          id: bondMarket.toString(),
                        },
                      ],
                    });
                  })
                  .catch((err) => console.log(err.stack))
            ) || [];

          Promise.allSettled(setTerms).then(([result]) => {
            setGroupedBondMarketsMap(termsMap);
            cache.setItem(
              'groupedBondMarketsMap',
              Object.assign({}, termsMap),
              process.env.NEXT_PUBLIC_GROUPED_BOND_MKTS_CACHE_SECS
            );
          });
        }
      }
    }
    callContract();
  }, [contract]);

  const groupedBondMarkets = useMemo(() => {
    return Object.values(groupedBondMarketsMap).sort((a: any, b: any) => a.header - b.header);
  }, [groupedBondMarketsMap]);

  const handleUpdate: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;

    setFormState({ ...formState, [fieldName]: value });
  };

  const handleTokenInput: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;
    const quotePrice = BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9);
    if (fieldName === 'purchaseAmount') {
      setFormState((prevState) => ({
        ...prevState,
        purchaseCost: Number(value * quotePrice).toFixed(
          token?.symbol === 'WETH' || token?.symbol === 'ETH' ? 9 : 2
        ),
        [fieldName]: value,
      }));
      return;
    }
    setFormState((prevState) => ({
      ...prevState,
      purchaseAmount: Number(value / quotePrice).toFixed(
        token?.symbol === 'WETH' || token?.symbol === 'ETH' ? 9 : 2
      ),
      [fieldName]: value,
    }));
  };

  const getSelectedMarketPrice = () => {
    if (!selectedMarket?.id) return;
    const output = (BigNumber.from(priceInfo || 0).toNumber() / Math.pow(10, 9)).toFixed(9);
    return token?.symbol === 'USDC' ? Number(output).toFixed(2) : output;
  };

  useEffect(() => {
    if (!isOpen) setFormState(initialFormState);
  }, [isOpen]);

  const updateFormState = (vals: any) => {
    setFormState({ ...formState, ...vals });
  };

  return (
    <BuyFormContext.Provider
      value={[
        {
          ...formState,
          bondMarkets,
          selectedMarket,
          groupedBondMarkets,
          groupedBondMarketsMap,
          selection,
        },
        { setSelection, updateFormState, handleUpdate, getSelectedMarketPrice, handleTokenInput },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
