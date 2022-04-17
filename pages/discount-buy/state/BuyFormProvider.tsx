import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import React, { BaseSyntheticEvent, useState } from 'react';

export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseCurrency: CurrencySelectOptionType;
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
    purchaseCurrency: { name: 'ETH' },
    purchasePrice: 0,
    purchaseAmount: 0,
  });
  const [selection, setSelection] = useState<SelectionType>();

  const handleUpdate: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;
    setFormState({ ...formState, [fieldName]: value });
  };

  return (
    <BuyFormContext.Provider
      value={[
        { ...formState, selection },
        { setSelection, handleUpdate },
      ]}
    >
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
