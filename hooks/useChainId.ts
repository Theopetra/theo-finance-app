import { useNetwork } from 'wagmi';

export function getChainId() {
  // fall back to mainnet in prod, else hardhat
  const defaultChainId = process.env.NEXT_PUBLIC_ENV === 'production' ? 1 : 31337;

  return parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '') || defaultChainId;
}

export function useChainId() {
  const { activeChain } = useNetwork();

  return activeChain?.id || getChainId();
}
