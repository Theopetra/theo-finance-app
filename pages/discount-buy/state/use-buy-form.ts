import { useContext } from 'react';
import { BuyFormContext } from './BuyFormProvider';

export const useBuyForm = () => {
  const [state, dispatch] = useContext(BuyFormContext);

  return [state, dispatch];
};

export default useBuyForm;
