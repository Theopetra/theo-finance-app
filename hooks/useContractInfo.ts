import { useConnect, useNetwork } from 'wagmi';
import { contractMetadata } from '../lib/contracts';
import { getChainId, useChainId } from './useChainId';

export function getContractInfo(name: keyof typeof contractMetadata, chainId: number = 0) {
  const defaultChainId = getChainId();
  const address = contractMetadata[name].address[chainId || (defaultChainId as 1 | 5)];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}

export function useContractInfo(name: keyof typeof contractMetadata, chainId: number = 0) {
  const defaultChainId = useChainId();
  return getContractInfo(name, chainId || defaultChainId)
}
