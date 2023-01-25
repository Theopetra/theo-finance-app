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
  const { pendingNotes: standardMemberships, reRender: tsReRender } =
    usePurchasesByContract('TheopetraStaking');
  const { pendingNotes: premiumMemberships, reRender: tslReRender } =
    usePurchasesByContract('TheopetraStakingLocked');

  const reRender = function () {
    wlReRender();
    pplReRender();
    tsReRender();
    tslReRender();
  };

  return (
    <UserPurchasesContext.Provider
      value={[
        {
          purchases: [...whitelistPurchases, ...publicPrelistPurchases],
          memberships: [...standardMemberships, ...premiumMemberships],
        },
        { reRender },
      ]}
    >
      {children}
    </UserPurchasesContext.Provider>
  );
};
