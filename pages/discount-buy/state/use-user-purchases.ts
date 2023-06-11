import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserPurchasesContext } from './UserPurchasesProvider';
import { getContract, getAccount } from '@wagmi/core';
import { Abi } from 'viem';

export const usePurchasesByContract = (contractName) => {
  const account = getAccount();
  const { address, abi } = useContractInfo(contractName);
  const { address: sTheoAddress, abi: sAbi } = useContractInfo('sTheopetra');
  const { address: pTheoAddress, abi: pAbi } = useContractInfo('pTheopetra');
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const [pendingNotes, setPendingNotes] = useState<any[]>([]);
  // This is a piece of state to trigger a re-render when the contract is updated.
  const [render, setRender] = useState(false);

  const reRender = function () {
    setRender((value) => !value);
  };

  const contract = getContract({
    address: address,
    abi: abi as Abi,
  });

  const theoAddress = contractName === 'TheopetraStaking' ? sTheoAddress : pTheoAddress;
  const theoAbi = contractName === 'TheopetraStaking' ? sAbi : pAbi;

  const stakedTheoContract = getContract({
    address: theoAddress,
    abi: theoAbi as Abi,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPurchases(true);
      const cachedData = cache.getItem(`purchases-${contractName}`);

      if (cachedData) {
        setPendingNotes(cachedData);
        setIsLoadingPurchases(false);
        return;
      }

      if (!contract || !account?.address) {
        setIsLoadingPurchases(false);
        return;
      }

      let indexes = [];

      try {
        if (contractName === 'TheopetraStaking' || contractName === 'TheopetraStakingLocked') {
          indexes = await contract.read.indexesFor([account?.address, false]);
        } else {
          indexes = await contract.read.indexesFor([account?.address]);
        }

        const pnPromises = indexes.map(async (i) => {
          let rewards = BigInt(0);
          let slashingPoolRewards = BigInt(0);
          let totalRewards = BigInt(0);
          let stakingInfo = null;

          if (contractName === 'TheopetraStaking' || contractName === 'TheopetraStakingLocked') {
            stakingInfo = (await contract.read.stakingInfo([account?.address, i])) as any;
          } else {
            stakingInfo = (await contract.read.pendingFor([account?.address, i])) as any;
          }

          try {
            totalRewards = (await stakedTheoContract.read.balanceForGons([
              stakingInfo.gonsRemaining,
            ])) as any;
            rewards = totalRewards - stakingInfo?.deposit;

            if (contractName === 'TheopetraStakingLocked') {
              slashingPoolRewards = (await contract.read.rewardsFor([account?.address, i])) as any;
              slashingPoolRewards = slashingPoolRewards - rewards;
            }
          } catch (e) {
            console.log(e);
          }

          return {
            rewards,
            slashingPoolRewards,
            stakingInfo,
          };
        });

        const pnData = await Promise.all(pnPromises);
        const pnObjs = pnData.map((p, i) => ({
          ...p,
          index: indexes[i],
          contractName,
        }));

        setPendingNotes(pnObjs);
        cache.setItem(
          `purchases-${contractName}`,
          pnObjs,
          process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
        );
      } catch (e) {
        console.log(e);
      }

      setIsLoadingPurchases(false);
    };

    fetchData();
  }, [account?.address, render, contractName]);

  return { pendingNotes, reRender, isLoadingPurchases };
};

export const useUserPurchases = () => {
  const state = useContext(UserPurchasesContext);

  return state;
};
