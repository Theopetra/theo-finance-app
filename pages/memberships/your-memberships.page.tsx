import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { add, format } from 'date-fns';
import React, { useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { PendingNote, useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
import { cache } from '@/lib/cache';
import { useContractInfo } from '@/hooks/useContractInfo';
import { Popover } from '@headlessui/react';
import { UserPurchasesProvider } from '../discount-buy/state/UserPurchasesProvider';
import { rewardAsPercent } from '@/util/reward-as-percent';
import useModal from '@/state/ui/theme/hooks/use-modal';
import UnstakeConfirm from './components/UnstakeConfirm';
import { Abi } from 'viem';
import { getAccount } from '@wagmi/core';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
const RewardsPoolPopover = ({ reward }) => (
  <Popover className="relative -mt-2  ">
    <Popover.Button>
      <div className="mx-auto flex items-center space-x-1 whitespace-normal rounded p-1 text-xs leading-snug hover:bg-slate-200">
        <div className="text-sm text-green-600">
          +{formatTheo(BigInt(reward), 2)} {reward} $THEO
        </div>
        <InformationCircleIcon width={14} height={14} className="text-gray-500" />
      </div>
    </Popover.Button>

    <Popover.Panel className=" absolute right-[100%] z-10 translate-x-[25%] rounded-xl bg-theo-navy p-2 text-center text-xs text-gray-300 shadow-xl">
      Slashing Pool Bonus available if stake is held to term.
    </Popover.Panel>
  </Popover>
);
const PenaltyPopover = ({ penalty, penaltyIsLoading }) => (
  <Popover className="relative -mt-2  ">
    <Popover.Button>
      <div className="mx-auto flex items-center space-x-1 whitespace-normal rounded p-1 text-xs leading-snug hover:bg-slate-200">
        <div className="text-red-700">
          {penaltyIsLoading ? 'Loading...' : `-${formatTheo(BigInt(penalty))} $THEO`}
        </div>
        <InformationCircleIcon width={14} height={14} className="text-gray-500" />
      </div>
    </Popover.Button>

    <Popover.Panel className=" absolute right-[100%] z-10 translate-x-[25%] rounded-xl bg-theo-navy p-2 text-center text-xs text-gray-300 shadow-xl">
      Rewards and part of principal slashed if unstaked while locked.
    </Popover.Panel>
  </Popover>
);

const UnstakeButton = ({
  purchase,
  matured,
  account,
}: {
  purchase: PendingNote;
  matured: boolean;
  account: any;
}) => {
  // STAKE
  const [, { openModal }] = useModal();
  const { address, abi } = useContractInfo(purchase.contractName);
  const { address: sTheoAddress, abi: sAbi } = useContractInfo('sTheopetra');
  const { address: pTheoAddress, abi: pAbi } = useContractInfo('pTheopetra');
  const { address: StakingDistributor, abi: StakingDistributorAbi } =
    useContractInfo('StakingDistributor');

  const { data: epochLength, isLoading: isEpochLengthLoading } = useContractRead({
    address: StakingDistributor,
    abi: StakingDistributorAbi as Abi,
    functionName: 'epochLength',
  });
  const theoAddress = purchase.contractName === 'TheopetraStaking' ? sTheoAddress : pTheoAddress;
  const theoAbi = purchase.contractName === 'TheopetraStaking' ? sAbi : pAbi;

  const { data: amountFromGons } = useContractRead({
    address: theoAddress,
    abi: theoAbi as Abi,
    functionName: 'balanceForGons',
    args: [purchase.gonsRemaining],
    cacheTime: cache.cacheTimesInMs.prices,
  });

  const amount = useMemo(() => {
    if (!purchase) return 0;
    if (!amountFromGons) return 0;
    return Number(BigInt(amountFromGons as string));
  }, [purchase, amountFromGons]);

  const timeRemaining = useMemo(() => {
    if (!purchase.stakingExpiry || isEpochLengthLoading || !epochLength) return 0;
    if (purchase.stakingExpiry && purchase.stakingExpiry <= Math.floor(Date.now() / 1000))
      return 100;
    const value =
      100 -
      Math.floor(
        (Number(epochLength) /
          (Number(BigInt(purchase.stakingExpiry).toString()) - Math.floor(Date.now() / 1000))) *
          100
      );

    return value;
  }, [purchase, epochLength, isEpochLengthLoading]);

  const { data: penalty, isLoading: penaltyIsLoading } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'getPenalty',
    args: [amount, timeRemaining],
    enabled: purchase.contractName !== 'TheopetraStaking',
  });
  const unstakeArgs = useMemo(
    () => [account?.address, [amount], false, [BigInt(purchase.index)]],
    [amount, account?.address, purchase]
  );

  return (
    <>
      <button
        className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
        onClick={() => {
          openModal(
            <UnstakeConfirm
              penalty={penalty}
              purchase={purchase}
              theoAddress={theoAddress}
              theoAbi={theoAbi}
              unstakeArgs={unstakeArgs}
              amount={amount}
              stakingContractAddress={address}
              stakingContractAbi={abi}
            />
          );
        }}
      >
        {`${matured ? 'Unstake' : 'Unstake Early'}`}
      </button>
      {!matured && <PenaltyPopover penalty={penalty || 0} penaltyIsLoading={penaltyIsLoading} />}
    </>
  );
};
const YourMemberships = () => {
  const [{ memberships, isLoadingMemberships, isLoadingPremiumMemberships }] = useUserPurchases();
  const formattedPurchases = useMemo(
    () =>
      memberships?.map((p) => {
        const endDate = p.stakingExpiry ? new Date(Number(BigInt(p.stakingExpiry)) * 1000) : '?';
        const startDate =
          p.contractName === 'TheopetraStaking' ? endDate : add(new Date(endDate), { years: -1 });
        return {
          startDate,
          endDate,
          timeRemaining: p.timeRemaining,
          deposit: p.deposit ? BigInt(p.deposit) : 0,
          rewards: p.rewards,
          contractName: p.contractName,
          index: p.index,
          slashingPoolRewards: p.slashingPoolRewards,
          matured: p.contractName === 'TheopetraStaking' ? true : endDate < new Date(),
          gonsRemaining: p.gonsRemaining
        };
      }),
    [memberships]
  );

  const account = getAccount();

  const { address, abi } = useContractInfo('StakingDistributor');

  const { data: nextRewardRateLocked, isLoading: isLoadingLocked } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'nextRewardRate',
    args: [3],
  });
  const { data: nextRewardRateStaking, isLoading: isLoadingStaking } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'nextRewardRate',
    args: [2],
  });
  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'contractName',
        id: 'type',
        width: '10%',
        Cell: ({ value }) => (value === 'TheopetraStaking' ? 'Standard' : 'Premium'),
      },
      {
        Header: 'APR',
        accessor: 'contractName',
        width: '10%',
        Cell: ({ value }) =>
          value === 'TheopetraStaking'
            ? (nextRewardRateStaking && `${rewardAsPercent(nextRewardRateStaking)}%`) || '5%'
            : (nextRewardRateLocked && `${rewardAsPercent(nextRewardRateLocked)}%`) || '18%',
      },
      {
        Header: 'THEO Committed',
        accessor: 'deposit',
        width: '10%',
        Cell: ({ value }) => formatTheo(value),
      },
      {
        Header: 'Joined',
        accessor: 'startDate',
        width: '10%',
        Cell: ({ value }) => (
          <span title={format(value, 'yyyy-MM-dd hh:mm:ss')}>{format(value, 'yyyy-MM-dd')}</span>
        ),
      },

      {
        Header: 'Unlock Date',
        accessor: 'endDate',
        width: '10%',
        Cell: ({ value, cell }) =>
          cell.row.original.contractName === 'TheopetraStaking' ? (
            'Anytime'
          ) : (
            <span title={format(value, 'yyyy-MM-dd hh:mm:ss')}>{format(value, 'yyyy-MM-dd')}</span>
          ),
      },
      {
        Header: 'Rewards',
        accessor: 'rewards',
        width: '10%',
        Cell: ({ value, cell }) => (
          <div className=" dark:text-white" title={formatTheo(BigInt(value), 6)}>
            <div className={`text-lg font-bold`}>{formatTheo(BigInt(value), 3)}</div>
            {cell.row.original.slashingPoolRewards > 0 && (
              <RewardsPoolPopover reward={cell.row.original.slashingPoolRewards} />
            )}
          </div>
        ),
      },

      {
        Header: 'Unstake',
        accessor: 'matured',
        width: '10%',
        Cell: ({ value: matured, cell }) => (
          <UnstakeButton purchase={cell.row.original} matured={matured} account={account} />
        ),
      },
    ],
    [account]
  );
  const fallbackMessage = useMemo(() => {
    if (account?.address && isLoadingMemberships) {
      return 'Checking your memberships...';
    }
    if (account?.address && formattedPurchases?.length === 0 && !isLoadingMemberships) {
      return 'You have no active memberships.';
    }
    if (!account?.address) {
      return 'Please connect your wallet.';
    }

    return '';
  }, [account, isLoadingMemberships, formattedPurchases]);

  return (
    <PageContainer>
      {account?.address && formattedPurchases?.length > 0 && (
        <PurchasesTable columns={columns} data={formattedPurchases} />
      )}
      <div className="text-center dark:text-white">{fallbackMessage}</div>
    </PageContainer>
  );
};
YourMemberships.PageStateProvider = (props) => <UserPurchasesProvider {...props} />;

YourMemberships.PageHead = () => {
  return <div>Your Memberships</div>;
};
export default YourMemberships;
