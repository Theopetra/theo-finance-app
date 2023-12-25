import { contractMetadata } from '../lib/contracts';
import { useChainId } from './useChainId';

export type BondDepoNameType = keyof typeof contractMetadata;
function getContractInfo(name: BondDepoNameType, chainId: number) {
  const address = contractMetadata[name].address[chainId];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}

export function useContractInfo(name: BondDepoNameType) {
  const chainId = useChainId();
  return getContractInfo(name, chainId);
}
