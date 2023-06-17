import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useContext } from 'react';
import { BuyFormContext } from './BuyFormProvider';

type MarketData = {
  quoteToken;
  valuationPrice;

  discountRate;
  marketPrice;
};
type Market = {
  capacity: BigInt;
  quoteToken: BigInt;
  capacityInQuote: BigInt;
  sold: BigInt;
  purchased: BigInt;
  totalDebt: BigInt;
  maxPayout: BigInt;
  marketData: MarketData;
  id: number;
};

export interface Terms {
  header: string;
  mapKey: number;
  terms: {
    fixedTerm: any;
    vesting: any;
    conclusion: any;
    bondRateFixed: any;
    maxBondRateVariable: any;
    discountRateBond: any;
    discountRateYield: any;
    maxDebt: any;
  };
  vestingTime: number;
  vestingTimeIncrement: string;
  vestingInMinutes: number;
  marketData: MarketData;
  id: number;
}

export interface TermsWithMarket extends Terms {
  markets: Market[];
}

export type GroupedBondMarketsMapType = {
  [key: string]: TermsWithMarket;
};

type BuyFormStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
  purchaseAmount: number | string;
  purchaseCost: number;
  transactionPending;
  selectedMarket: TermsWithMarket;
  groupedBondMarketsMap: GroupedBondMarketsMapType;
  selection: {
    label: number;
    value: number;
  };
  setSelection: (selection: { label: string; value: string }) => void;
  maxSlippage: number;
  UIBondMarketsIsLoading: boolean;
  convertedMaxPayout: number;
  terms: Terms[];
};
type BuyFormDispatchType = {
  setSelection;
  handleUpdate;
  getSelectedMarketPrice;
  handleTokenInput;
  updateFormState;
};
type BuyFormType = [BuyFormStateType, BuyFormDispatchType];
export const useBuyForm = () => {
  const [state, dispatch] = useContext(BuyFormContext);

  return [state, dispatch] as BuyFormType;
};

export default useBuyForm;
