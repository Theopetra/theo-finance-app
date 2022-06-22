import { useActiveBondDepo } from './useActiveBondDepo';
import { navigation } from '../pages/nav-config';

export function useNavigation() {
  const { activeContractName } = useActiveBondDepo();
  if (activeContractName === 'WhitelistTheopetraBondDepository') {
    return navigation.filter((n) => n.href !== '/discount-buy');
  } else {
    return navigation.filter((n) => n.href !== '/whitelist-sale');
  }
}
