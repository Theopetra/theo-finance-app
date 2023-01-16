import { useContractInfo } from './useContractInfo';

export function useActiveBondDepo() {
  const activeContractName =
    Date.now() < parseInt('0') * 1000
      ? 'WhitelistTheopetraBondDepository'
      : 'PublicPreListBondDepository';
  console.log(activeContractName);
  return { activeContractName, ...useContractInfo(activeContractName) };
}
