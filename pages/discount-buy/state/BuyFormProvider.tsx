import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useContractInfo } from '@/hooks/useContractInfo';
import React, { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useContract, useContractRead, useProvider } from 'wagmi';

export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType;
  purchasePrice;
  purchaseAmount;
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
};

export const BuyFormProvider: React.FC = (props) => {
  const [formState, setFormState] = useState<formStateType>({
    theoPrice: 100,
    purchaseToken: { symbol: 'ETH', address: '' },
    purchasePrice: 0,
    purchaseAmount: 0,
  });
  const [selection, setSelection] = useState<SelectionType>();
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState({});
  const { address, abi } = useContractInfo('WhitelistTheopetraBondDepository', 1);
  const provider = useProvider();

  const { data: WhitelistBondMarkets } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'liveMarkets'
  );

  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const termsMap = {};
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
                  { ...terms, marketData: market, id: bondMarket.toString() },
                ],
              });
            })
            .catch((err) => console.log(err.stack))
      ) || [];

    Promise.allSettled(setTerms).then(([result]) => {
      setGroupedBondMarketsMap(termsMap);
    });
  }, [contract, WhitelistBondMarkets]);

  const groupedBondMarkets = useMemo(() => {
    return Object.values(groupedBondMarketsMap).sort((a, b) => a.header - b.header);
  }, [groupedBondMarketsMap]);

  const handleUpdate: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;

    setFormState({ ...formState, [fieldName]: value });
  };

  return (
    <BuyFormContext.Provider
      value={[
        { ...formState, groupedBondMarkets, groupedBondMarketsMap, selection },
        { setSelection, handleUpdate },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
