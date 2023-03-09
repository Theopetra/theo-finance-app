import { networkNames } from '@/lib/network_names';
import { etherscanBlockExplorers } from 'wagmi';
import { useChainId } from './useChainId';

export function useEtherscanTxId(txId) {
  const chainId = useChainId();
  const networkName = networkNames[chainId];
  const baseUrl = etherscanBlockExplorers[networkName];
  return `${baseUrl?.url}/tx/${txId}`;
}
