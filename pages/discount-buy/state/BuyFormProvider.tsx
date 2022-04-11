import React, { BaseSyntheticEvent, ReactNode, useState } from 'react';

export const BuyFormContext = React.createContext<any>(null);

export const BuyFormProvider: React.FC = (props) => {
  const [formState, setFormState] = useState({
    theoPrice: 100,
    purchaseCurrency: 'ETH',
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
