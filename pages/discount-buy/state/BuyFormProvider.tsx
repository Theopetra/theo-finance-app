import { CurrencySelectOptionType } from '@/components/CurrencySelect';
import React, { BaseSyntheticEvent, useState } from 'react';

export const BuyFormContext = React.createContext<any>(null);

type formStateType = {
  theoPrice: number;
  purchaseCurrency: CurrencySelectOptionType;
  purchasePrice;
};

export const BuyFormProvider: React.FC = (props) => {
  const [formState, setFormState] = useState<formStateType>({
    theoPrice: 100,
    purchaseCurrency: { name: 'ETH' },
    purchasePrice: 0,
  });

  const handleUpdate: any = (e: BaseSyntheticEvent, fieldName: string) => {
    const value = e.target.value;
    setFormState({ ...formState, [fieldName]: value });
  };

  return (
    <BuyFormContext.Provider value={[{ ...formState }, { handleUpdate }]}>
      {props.children}
    </BuyFormContext.Provider>
  );
};

export default BuyFormProvider;
