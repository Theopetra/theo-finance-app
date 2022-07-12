import { useNetwork } from 'wagmi';

export function useChainId() {
  const { activeChain } = useNetwork();
  // fall back to mainnet in prod, else goerli
  const defaultChainId = process.env.NODE_ENV === 'production' ? 1 : 5;
  // parameter id > connected wallet chain id > environment default
  return activeChain?.id || parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '') || defaultChainId;
}
