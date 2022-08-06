import BuyFormProvider from '@/pages/discount-buy/state/BuyFormProvider';
import React from 'react';
import { ThemeProvider, ModalProvider } from '../ui/theme';
import ChainProvider from './ChainProvider';

const AppProviders = (props) => {
  return (
    <ThemeProvider>
      <ChainProvider>
        <ModalProvider>
          <BuyFormProvider>{props.children}</BuyFormProvider>
        </ModalProvider>
      </ChainProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
