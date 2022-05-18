import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppProviders from '@/state/app/AppProviders';
import AppContainer from '@/components/AppContainer';
import { FC } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { chain, createClient, WagmiProvider } from 'wagmi';
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const AppWrapper = (props: JSX.IntrinsicAttributes & CustomAppProps) => (
  <WagmiProvider client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <AppProviders>
        <App {...props} />
      </AppProviders>
    </RainbowKitProvider>
  </WagmiProvider>
);
type AppComponentExtensions = {
  PageHead: FC;
  PageStateProvider: any;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & AppComponentExtensions;
}

const NoopComponent = (props) => <>{props.children}</>;

function App({ Component, pageProps }: CustomAppProps) {
  const { PageHead = NoopComponent, PageStateProvider = NoopComponent } = Component;
  return (
    <AppContainer Header={PageHead} PageStateProvider={PageStateProvider}>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default AppWrapper;
