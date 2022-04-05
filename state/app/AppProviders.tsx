import React from 'react';
import { ThemeProvider, ModalProvider } from '../ui/theme';

const AppProviders = (props) => {
  return (
    <ThemeProvider>
      <ModalProvider>{props.children}</ModalProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
