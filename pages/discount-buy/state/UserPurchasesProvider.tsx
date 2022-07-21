import React from 'react';
import { usePurchasesByContract } from './use-user-purchases';

export const UserPurchasesContext = React.createContext<any>(null);

export const UserPurchasesProvider = ({ children }) => {
  const { pendingNotes: whitelistPurchases, setRender } = usePurchasesByContract(
    'WhitelistTheopetraBondDepository'
  );
  const { pendingNotes: publicPrelistPurchases } = usePurchasesByContract(
    'PublicPreListBondDepository'
  );

  return (
    <UserPurchasesContext.Provider
      value={[{ purchases: [...whitelistPurchases, ...publicPrelistPurchases] }, { setRender }]}
    >
      {children}
    </UserPurchasesContext.Provider>
  );
};
