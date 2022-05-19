import React from 'react';
import { ThemeProvider, ModalProvider } from '../ui/theme';
import ChainProvider from './ChainProvider';

const AppProviders = (props) => {
  return (
    <ChainProvider>
      <ThemeProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </ThemeProvider>
    </ChainProvider>
  );
};

export default AppProviders;
