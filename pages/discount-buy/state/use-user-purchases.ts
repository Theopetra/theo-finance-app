import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import { UserPurchasesContext } from './UserPurchasesProvider';

export const usePurchasesByContract = (contractName) => {
  const { data } = useAccount();
  const { address, abi } = useContractInfo(contractName);
  const [pendingNotes, setPendingNotes] = useState<any[]>([]);
  // This is a piece of state to trigger a re-render when the contract is updated.
  const [render, setRender] = useState(false);

  const reRender = function () {
    setRender(!render);
  };

  const provider = useProvider();
  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function callContract() {
      const cached = cache.getItem(`purchases-${contractName}`);

      if (cached) {
        setPendingNotes(cached);
      } else if (contract && data?.address) {
        let indexes = [];

        if (contractName === 'TheopetraStaking' || contractName === 'TheopetraStakingLocked') {
          indexes = await contract.indexesFor(data?.address, false);

          const pnPromises = indexes.map(async (i) => {
            return {
              rewards: await contract.rewardsFor(data?.address, i),
              stakingInfo: await contract.stakingInfo(data?.address, i),
            };
          });
          const pn = await Promise.all(pnPromises);
          const pnObjs = pn.map((p, i) =>
            Object.assign({}, { ...p, index: indexes[i], contractName })
          );
          console.log(pnObjs);
          setPendingNotes(pnObjs);
          cache.setItem(
            `memberships-${contractName}`,
            indexes,
            process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
          );
        } else {
          indexes = await contract.indexesFor(data?.address);

          const pnPromises = indexes.map((i) => contract.pendingFor(data?.address, i));
          const pn = await Promise.all(pnPromises);
          const pnObjs = pn.map((p, i) =>
            Object.assign({}, { ...p, index: indexes[i], contractName })
          );
          setPendingNotes(pnObjs);
          cache.setItem(
            `purchases-${contractName}`,
            pnObjs,
            process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
          );
        }
      }
    }
    callContract();
  }, [contract, data?.address, render, contractName]);

  return { pendingNotes, reRender };
};

export const useUserPurchases = () => {
  const state = useContext(UserPurchasesContext);

  return state;
};
