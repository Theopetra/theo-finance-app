import { useMemo } from 'react';
import { useNetwork } from 'wagmi';

export function getChainId() {
  // fall back to mainnet in prod, else hardhat
  const defaultChainId = process.env.NEXT_PUBLIC_ENV === 'production' ? 1 : 31337;
  return process.env.NEXT_PUBLIC_CHAIN_ID
    ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
    : defaultChainId;
}

export function useChainId() {
  const { chain } = useNetwork();
  const chainId = useMemo(() => chain?.id || getChainId(), [chain]);
  return chainId;
}
