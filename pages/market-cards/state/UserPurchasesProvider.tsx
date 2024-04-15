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
  const { pendingNotes: theopetraPurchases, reRender: tbdReRender } =
    usePurchasesByContract('TheopetraBondDepository');
  const {
    pendingNotes: standardMemberships,
    reRender: tsReRender,
    isLoadingPurchases: isLoadingStandardMemberships,
  } = usePurchasesByContract('TheopetraStaking');
  const {
    pendingNotes: premiumMemberships,
    reRender: tslReRender,
    isLoadingPurchases: isLoadingPremiumMemberships,
  } = usePurchasesByContract('TheopetraStakingLocked');
  // const {
  //   pendingNotes: mobyPurchases,
  //   reRender: mobyReRender,
  //   isLoadingPurchases: isLoadingMobyPurchases,
  // } = usePurchasesByContract('MobyBondDepository');

  const reRender = function () {
    wlReRender();
    pplReRender();
    tbdReRender();
    tsReRender();
    tslReRender();
    // mobyReRender();
  };

  return (
    <UserPurchasesContext.Provider
      value={[
        {
          isLoadingMemberships: isLoadingStandardMemberships || isLoadingPremiumMemberships,
          purchases: [
            ...whitelistPurchases,
            ...publicPrelistPurchases,
            ...theopetraPurchases,
            // ...mobyPurchases,
          ],
          memberships: [...standardMemberships, ...premiumMemberships],
        },
        { reRender },
      ]}
    >
      {children}
    </UserPurchasesContext.Provider>
  );
};
