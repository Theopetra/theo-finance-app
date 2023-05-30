import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import { useContext } from 'react';
import { BuyFormContext } from './BuyFormProvider';
type BuyFormStateType = {
  theoPrice: number;
  purchaseToken: CurrencySelectOptionType | null;
  purchaseAmount;
  purchaseCost;
  transactionPending;
  selectedTerm;
  selectedMarket;
  groupedBondMarkets;
  groupedBondMarketsMap;
  selection;
  setSelection;
  maxSlippage;
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
