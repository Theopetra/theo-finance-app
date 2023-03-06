import { useContractInfo } from './useContractInfo';

export function useActiveBondDepo() {
  const activeContractName =
    Date.now() < parseInt('0') * 1000
      ? 'WhitelistTheopetraBondDepository'
      : 'PublicPreListBondDepository';
  return { activeContractName, ...useContractInfo(activeContractName) };
}
