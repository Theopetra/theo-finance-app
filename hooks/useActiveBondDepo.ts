import { useContractInfo } from './useContractInfo';

export function useActiveBondDepo() {
  const activeContractName =
    Date.now() < parseInt('0') * 1000
      ? 'WhitelistTheopetraBondDepository'
      : 'TheopetraBondDepository';
  return { activeContractName, ...useContractInfo(activeContractName) };
}
