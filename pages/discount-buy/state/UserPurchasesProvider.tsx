import React from 'react';
import { usePurchasesByContract } from './use-user-purchases';

export const UserPurchasesContext = React.createContext<any>(null);

export const UserPurchasesProvider = ({ children }) => {
  const { pendingNotes: whitelistPurchases, reRender: wlReRender } = usePurchasesByContract(
    'WhitelistTheopetraBondDepository'
  );
  const { pendingNotes: publicPrelistPurchases, reRender: pplReRender } = usePurchasesByContract(
    'PublicPreListBondDepository'
  );

  const reRender = function () {
    wlReRender();
    pplReRender();
  };

  return (
    <UserPurchasesContext.Provider
      value={[{ purchases: [...whitelistPurchases, ...publicPrelistPurchases] }, { reRender }]}
    >
      {children}
    </UserPurchasesContext.Provider>
  );
};
