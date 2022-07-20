import React, { useEffect } from 'react';
import { usePurchasesByContract } from './use-user-purchases';

export const UserPurchasesContext = React.createContext<any>(null);

export const UserPurchasesProvider = ({ children }) => {
  const { pendingNotes: whitelistPurchases, setRender } = usePurchasesByContract(
    'WhitelistTheopetraBondDepository'
  );
  const { pendingNotes: publicPrelistPurchases } = usePurchasesByContract(
    'PublicPreListBondDepository'
  );

  useEffect(() => {
    console.log('reloaded?');
  }, [whitelistPurchases, publicPrelistPurchases]);

  return (
    <UserPurchasesContext.Provider
      value={[{ purchases: [...whitelistPurchases, ...publicPrelistPurchases] }, { setRender }]}
    >
      {children}
    </UserPurchasesContext.Provider>
  );
};
