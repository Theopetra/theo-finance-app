import { useContractInfo } from './useContractInfo';

export function useActiveBondDepo() {
  const activeContractName =
    Date.now() < parseInt(process.env.NEXT_PUBLIC_WHITELIST_EXPIRY_EPOCH_SECONDS || '0') * 1000
      ? 'WhitelistTheopetraBondDepository'
      : 'PublicPreListBondDepository';
  return { activeContractName, ...useContractInfo(activeContractName) };
}
