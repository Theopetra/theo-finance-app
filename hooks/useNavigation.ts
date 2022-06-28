import { useActiveBondDepo } from './useActiveBondDepo';
import { navigation } from '../pages/nav-config';

export function useNavigation() {
  const { activeContractName } = useActiveBondDepo();
  if (activeContractName !== 'WhitelistTheopetraBondDepository') {
    navigation[1].name = 'Pre-Market Sale';
  }
  return navigation;
}
