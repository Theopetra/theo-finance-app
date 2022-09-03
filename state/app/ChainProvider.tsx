import {
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import { useTheme } from '../ui/theme';
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const localChains = [chain.goerli];
const prodChains = [chain.mainnet, ...localChains];

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

if (!infuraId) {
  console.log('WARNING: No infura id specified!');
}

if (!alchemyId) {
  console.log('WARNING: No alchemy id specified!');
}

const { chains, provider } = configureChains(
  process.env.NODE_ENV === 'production' ? prodChains : localChains,
  [infuraProvider({ infuraId }), alchemyProvider({ alchemyId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Theopetra Finance',
  chains,
});
export const wagmiClient = createClient({
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
