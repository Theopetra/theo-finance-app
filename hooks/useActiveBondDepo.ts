import { useContractInfo } from './useContractInfo';

export function useActiveBondDepo() {
  const { address, abi } = useContractInfo('TheopetraBondDepository');
  return { address, abi };
}
