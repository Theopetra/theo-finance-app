import { contractMetadata } from '../lib/contracts';

export function useContractInfo(name: keyof typeof contractMetadata, chainId: number) {
  const address = contractMetadata[name].address[chainId as 1 | 4];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}
