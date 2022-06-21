import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useContext } from 'react';
import { BuyFormContext } from './BuyFormProvider';
type BuyFormStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
  purchaseAmount;
  purchaseCost;
  bondMarkets;
  selectedMarket;
  groupedBondMarkets;
  groupedBondMarketsMap;
  selection;
};
type BuyFormDispatchType = { setSelection; handleUpdate; getSelectedMarketPrice; handleTokenInput };
type BuyFormType = [BuyFormStateType, BuyFormDispatchType];
export const useBuyForm = () => {
  const [state, dispatch] = useContext(BuyFormContext);

  return [state, dispatch] as BuyFormType;
};

export default useBuyForm;
