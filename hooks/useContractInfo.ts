import { contractMetadata } from '../lib/contracts';
import { useChainId } from './useChainId';

export function getContractInfo(name: keyof typeof contractMetadata, chainId: number) {
  const address = contractMetadata[name].address[chainId];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}

export function useContractInfo(name: keyof typeof contractMetadata) {
  const chainId = useChainId();
  return getContractInfo(name, chainId);
}
