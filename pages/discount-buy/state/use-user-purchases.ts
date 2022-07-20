import { useContractInfo } from '@/hooks/useContractInfo';
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
      if (contract && data?.address) {
        const indexes = await contract.indexesFor(data?.address);
        const pnPromises = indexes.map((i) => contract.pendingFor(data?.address, i));
        const pn = await Promise.all(pnPromises);
        setPendingNotes(pn);
      }
    }
    callContract();
  }, [contract, data?.address, render]);

  return { pendingNotes, setRender };
};

export const useUserPurchases = () => {
  const state = useContext(UserPurchasesContext);

  return state;
};
