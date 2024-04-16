import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { useContext, useEffect, useState } from 'react';
import { UserPurchasesContext } from './UserPurchasesProvider';
import { getContract, getAccount, watchPendingTransactions } from '@wagmi/core';
import { Abi } from 'viem';
import { contractMetadata } from '@/lib/contracts';
// stakingInfo interface
export interface StakingInfo {
  deposit?: bigint;
  gonsInWarmup?: bigint;
  warmupExpiry?: bigint;
  stakingExpiry?: bigint;
  gonsRemaining?: bigint;
}

export interface PendingFor {
  payout?: bigint;
  created?: bigint;
  expiry?: bigint;
  timeRemaining?: bigint;
  matured?: boolean;
  discount?: bigint;
}

// interface that includes both stakingInfo and pendingFor
export interface PendingNote extends StakingInfo, PendingFor {
  index: bigint;
  contractName: keyof typeof contractMetadata;
  rewards?: bigint;
  slashingPoolRewards?: bigint;
}

export const usePurchasesByContract = (contractName) => {
  const account = getAccount();
  const { address, abi } = useContractInfo(contractName);
  const { address: sTheoAddress, abi: sAbi } = useContractInfo('sTheopetra');
  const { address: pTheoAddress, abi: pAbi } = useContractInfo('pTheopetra');
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const [pendingNotes, setPendingNotes] = useState<PendingNote[]>([]);
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
          indexes = (await contract.read.indexesFor([account?.address, false])) as any;
        } else {
          indexes = (await contract.read.indexesFor([account?.address])) as any;
        }

        if (indexes.length == 0) {
          let rewards = BigInt(0);
          let slashingPoolRewards = BigInt(0);
          let totalRewards = BigInt(0);
          let stakingInfo: StakingInfo = {};
          let pendingFor: PendingFor = {};
          return {
            rewards,
            slashingPoolRewards,
            ...stakingInfo,
            ...pendingFor,
          };
        } else {
          const pnPromises = indexes.map(async (index) => {
            let rewards = BigInt(0);
            let slashingPoolRewards = BigInt(0);
            let totalRewards = BigInt(0);
            let stakingInfo: StakingInfo = {};
            let pendingFor: PendingFor = {};

            if (contractName === 'TheopetraStaking' || contractName === 'TheopetraStakingLocked') {
              // "0": "deposit",
              // "1": "gonsInWarmup",
              // "2": "warmupExpiry",
              // "3": "stakingExpiry",
              // "4": "gonsRemaining",
              const sValues = (await contract.read.stakingInfo([account?.address, index])) as any;
              stakingInfo = {
                deposit: sValues?.[0],
                gonsInWarmup: sValues?.[1],
                warmupExpiry: sValues?.[2],
                stakingExpiry: sValues?.[3],
                gonsRemaining: sValues?.[4],
              };
            } else {
              const pValues = (await contract.read.pendingFor([account?.address, index])) as any;
              pendingFor = {
                payout: pValues?.[0],
                created: pValues?.[1],
                expiry: pValues?.[2],
                timeRemaining: pValues?.[3],
                matured: pValues?.[4],
                discount: pValues?.[5],
              } as any;
              // "0": "payout_",
              // "1": "created_",
              // "2": "expiry_",
              // "3": "timeRemaining_",
              // "4": "matured_",
              // "5": "discount_",
            }

            try {
              totalRewards = (await stakedTheoContract.read.balanceForGons([
                stakingInfo?.gonsRemaining,
              ])) as any;
              rewards = totalRewards - BigInt(stakingInfo?.deposit || 0);
              if (contractName === 'TheopetraStakingLocked') {
                const slashingPoolRewardsVal = (await contract.read.rewardsFor([
                  account?.address,
                  index,
                ])) as any;
                slashingPoolRewards = slashingPoolRewardsVal - rewards;
              }
            } catch (e) {
              console.log(e);
            }

            return {
              rewards,
              slashingPoolRewards,
              ...stakingInfo,
              ...pendingFor,
            };
          });

        const pnData = await Promise.all(pnPromises);
        const pnObjs = pnData.map((p, i) => ({
          ...p,
          index: indexes[i],
          contractName,
        }));

        setPendingNotes(pnObjs);
        // cache.setItem(
        //   `purchases-${contractName}`,
        //   pnObjs,
        //   process.env.NEXT_PUBLIC_PURCHASE_CACHE_SECS
        // );
      }} catch (e) {
        console.log(e);
      }

      setIsLoadingPurchases(false);
    };

    fetchData();
  }, [account?.address, render, contractName]);

  useEffect(() => {
    watchPendingTransactions({}, (transactions) =>
    reRender()
  );
  })

  return { pendingNotes, reRender, isLoadingPurchases };
};

export const useUserPurchases = () => {
  const state = useContext(UserPurchasesContext);

  return state;
};
