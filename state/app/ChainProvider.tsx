import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import { useTheme } from '../ui/theme';
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

const ChainProvider = (props) => {
  const [{ theme }] = useTheme();

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        theme={
          theme === 'dark'
            ? darkTheme({
                accentColor: '#0d0d0d',
                accentColorForeground: '#50aecb',
                borderRadius: 'medium',
              })
            : lightTheme({
                accentColor: '#ffffff',
                accentColorForeground: '#2f455c',
                borderRadius: 'medium',
              })
        }
        chains={chains}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default ChainProvider;
