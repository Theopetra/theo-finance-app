import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, WagmiConfig, Chain, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';

import { useTheme } from '../ui/theme';

import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const envChains = () => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return [chain.mainnet];
    case 'staging':
      return [chain.hardhat];
    default:
      return [chain.hardhat];
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
const { chains, publicClient } = configureChains(envChains(), [
  // ...(process.env.NEXT_PUBLIC_ENV === 'staging' || process.env.NEXT_PUBLIC_ENV === 'local'
  //   ? [
  //       jsonRpcProvider({
  //         rpc: () => ({ http: 'https://mainnet-fork-endpoint-x1gi.onrender.com' }),
  //       }),
  //     ]
  //   : []),
  infuraProvider({ infuraId }),
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'Theopetra Finance',
  chains,
});
const config = createConfig({
  autoConnect: true,

  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
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
