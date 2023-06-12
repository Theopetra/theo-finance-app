import { networkNames } from '@/lib/network_names';
import { useChainId } from './useChainId';
import { mainnet } from 'wagmi';

export function useEtherscanTxId(txId) {
  const chainId = useChainId();
  const networkName = networkNames[chainId];
  const mainnetEtherscanBlockExplorer = mainnet.blockExplorers.default;
  const baseUrl = mainnetEtherscanBlockExplorer[networkName];
  return `${baseUrl?.url}/tx/${txId}`;
}
