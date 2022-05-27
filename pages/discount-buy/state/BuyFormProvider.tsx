import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useContractInfo } from '@/hooks/useContractInfo';
import { BigNumber } from 'ethers';
import React, { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useContract, useContractRead, useProvider, useToken } from 'wagmi';

export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
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
  selectedBondDuration?;
};

export const BuyFormProvider: React.FC = (props) => {
  const [selection, setSelection] = useState<SelectionType>();
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState({});

  const [formState, setFormState] = useState<formStateType>({
    theoPrice: 100,
    purchaseToken: null,
    purchaseAmount: 0,
  });
  const { address, abi } = useContractInfo('WhitelistTheopetraBondDepository', 1);
  const provider = useProvider();
  const { data: token } = useToken({ address: formState.purchaseToken?.quoteToken });

  const bondMarkets = groupedBondMarketsMap[selection?.selectedBondDuration];
  const selectedMarket = bondMarkets?.markets.find(
    (x) => x.marketData.quoteToken === formState.purchaseToken?.address
  );

  const { data: WhitelistBondMarkets, isSuccess: WhitelistBondMarketsSuccess } = useContractRead(
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
    if (WhitelistBondMarketsSuccess) {
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
    }
  }, [contract, WhitelistBondMarkets, WhitelistBondMarketsSuccess]);

  const groupedBondMarkets = useMemo(() => {
    return Object.values(groupedBondMarketsMap).sort((a, b) => a.header - b.header);
  }, [groupedBondMarketsMap]);

  const handleUpdate: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;

    setFormState({ ...formState, [fieldName]: value });
  };

  const { address: WhitelistBondDepositoryAddress, abi: WhitelistBondDepositoryAbi } =
    useContractInfo('WhitelistTheopetraBondDepository', 1);
  const { data: priceInfo } = useContractRead(
    {
      addressOrName: WhitelistBondDepositoryAddress,
      contractInterface: WhitelistBondDepositoryAbi,
    },
    'calculatePrice',
    { args: selectedMarket?.id }
  );

  const getSelectedMarketPrice = () => {
    if (!selectedMarket?.id) return;
    const output = (BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9)).toFixed(5);
    return token?.symbol === 'USDC' ? Number(output).toFixed(2) : output;
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
        { setSelection, handleUpdate, getSelectedMarketPrice },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
