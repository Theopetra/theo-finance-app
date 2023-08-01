import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';

import { useTheme } from '../ui/theme';

import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { hardhat } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const envChains = () => {
  console.log(process.env.NEXT_PUBLIC_ENV);
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return [mainnet];
    case 'local':
      return [hardhat];
    case 'staging':
      return [hardhat];
    default:
      return [mainnet];
  }
};

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID || '';
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || '';
const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || '';

if (!infuraId) {
  console.log('WARNING: No infura id specified!');
}

if (!alchemyId) {
  console.log('WARNING: No alchemy id specified!');
}

const { chains, publicClient } = configureChains(
  [...envChains()],
  [
    // jsonRpcProvider({
    //   rpc: () => ({ http: 'https://mainnet-fork-endpoint-x1gi.onrender.com' }),
    // }),
    infuraProvider({ apiKey: infuraId }),
    alchemyProvider({ apiKey: alchemyId }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Theopetra Finance',
  projectId: walletConnectId,
  chains,
});
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const ChainProvider = (props) => {
  const [{ theme }] = useTheme();

  return (
    <WagmiConfig config={config}>
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
