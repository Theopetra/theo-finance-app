import { BondDepoNameType, useContractInfo } from './useContractInfo';

export function useActiveBondDepo(bondName: BondDepoNameType) {
  const { address, abi } = useContractInfo(bondName);
  return { address, abi };
}
