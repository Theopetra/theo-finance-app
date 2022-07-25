import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { add } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import { UserPurchasesContext } from './UserPurchasesProvider';

export const usePurchasesByContract = (contractName) => {
  const { data } = useAccount();
  const { address, abi } = useContractInfo(contractName);
  const [pendingNotes, setPendingNotes] = useState<any[]>([]);
  // This is a piece of state to trigger a re-render when the contract is updated.
  const [render, setRender] = useState(false);

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
        const indexes = await contract.indexesFor(data?.address);
        const pnPromises = indexes.map((i) => contract.pendingFor(data?.address, i));
        const pn = await Promise.all(pnPromises);
        const pnObjs = pn.map((p) => Object.assign({}, p));
        setPendingNotes(pnObjs);
        cache.setItem(
          `purchases-${contractName}`,
          pnObjs,
          process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
        );
      }
    }
    callContract();
  }, [contract, data?.address, render, contractName]);

  return { pendingNotes, setRender };
};

export const useUserPurchases = () => {
  const state = useContext(UserPurchasesContext);

  return state;
};
