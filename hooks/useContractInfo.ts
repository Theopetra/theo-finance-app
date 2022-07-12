import { useConnect, useNetwork } from 'wagmi';
import { contractMetadata } from '../lib/contracts';
import { useChainId } from './useChainId';

export function useContractInfo(name: keyof typeof contractMetadata, chainId: number = 0) {
  const defaultChainId = useChainId();
  const address = contractMetadata[name].address[chainId || (defaultChainId as 1 | 5)];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}
