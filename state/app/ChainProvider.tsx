import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig, Chain } from 'wagmi';

import { useTheme } from '../ui/theme';
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
export const sepolia = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'sepoliaETH',
    symbol: 'sepoliaETH',
  },
  rpcUrls: {
    default: 'https://sepolia.infura.io/v3/445d2fc9c7b64c7e976ae27a7ac27ae2',
  },
  blockExplorers: {
    default: { name: 'etherscan', url: 'https://sepolia.etherscan.io' },
  },
} as Chain;

const envChains = () => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return [chain.mainnet];
    case 'staging':
      return [sepolia, chain.hardhat];
    default:
      return [chain.hardhat, chain.localhost, sepolia];
  }
};

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

if (!infuraId) {
  console.log('WARNING: No infura id specified!');
}

if (!alchemyId) {
  console.log('WARNING: No alchemy id specified!');
}
const { chains, provider } = configureChains(envChains(), [
  ...(process.env.NEXT_PUBLIC_ENV === 'staging' || process.env.NEXT_PUBLIC_ENV === 'local'
    ? [
        jsonRpcProvider({
          rpc: () => ({ http: 'https://mainnet-fork-endpoint-x1gi.onrender.com' }),
        }),
      ]
    : []),
  infuraProvider({ infuraId }),
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

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
    <WagmiConfig client={wagmiClient}>
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
    </WagmiConfig>
  );
};

export default ChainProvider;
