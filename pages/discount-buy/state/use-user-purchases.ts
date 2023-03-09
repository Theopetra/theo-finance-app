import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { BigNumber } from 'ethers';
import { useContext, useEffect, useMemo, useState } from 'react';
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

  useMemo(() => {
    async function callContract() {
      const cached = cache.getItem(`purchases-${contractName}`);
      if (cached) {
        setPendingNotes(cached);
      } else if (contract && data?.address) {
        let indexes = [];

        if (contractName === 'TheopetraStaking' || contractName === 'TheopetraStakingLocked') {
          try {
            indexes = await contract.indexesFor(data?.address, true);

            const pnPromises = indexes.map(async (i) => {
              let rewards;
              try {
                rewards = await contract.rewardsFor(data?.address, i);
              } catch (e) {
                rewards = BigNumber.from(0);
                console.log(e);
              }
              return {
                rewards,
                stakingInfo: await contract.stakingInfo(data?.address, i),
              };
            });
            const pn = await Promise.all(pnPromises);
            const pnObjs = pn.map((p, i) =>
              Object.assign({}, { ...p, index: indexes[i], contractName })
            );
            setPendingNotes(pnObjs);
            cache.setItem(
              `memberships-${contractName}`,
              indexes,
              process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
            );
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
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
          } catch (e) {
            console.log(e);
          }
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
