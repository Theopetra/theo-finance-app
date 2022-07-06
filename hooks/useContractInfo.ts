import { useConnect, useNetwork } from 'wagmi';
import { contractMetadata } from '../lib/contracts';

export function useContractInfo(name: keyof typeof contractMetadata, chainId: number = 0) {
  const { activeChain } = useNetwork();
  // fall back to mainnet in prod, else goerli
  const defaultChainId = process.env.NODE_ENV === 'production' ? 1 : 5;
  // parameter id > connected wallet chain id > environment default
  chainId = chainId || activeChain?.id || defaultChainId;
  const address = contractMetadata[name].address[chainId as 1 | 5];
  const abi = contractMetadata[name].abi;
  return { address, abi };
}
