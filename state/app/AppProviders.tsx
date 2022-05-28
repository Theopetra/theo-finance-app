import React from 'react';
import { ThemeProvider, ModalProvider } from '../ui/theme';
import ChainProvider from './ChainProvider';

const AppProviders = (props) => {
  return (
    <ThemeProvider>
      <ChainProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </ChainProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
