import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { add, format } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useAccount, useContractRead, useContractWrite, useSigner } from 'wagmi';
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
import { cache } from '@/lib/cache';
import { useContractInfo } from '@/hooks/useContractInfo';
import { Popover } from '@headlessui/react';
import { UserPurchasesProvider } from '../discount-buy/state/UserPurchasesProvider';

const PenaltyPopover = () => (
  <Popover className="relative -mt-2  ">
    <Popover.Button>
      <div className="mx-auto flex whitespace-normal rounded p-1 text-[10px] leading-snug hover:bg-slate-200">
        Rewards slashed
      </div>
    </Popover.Button>

    <Popover.Panel className=" absolute right-[100%] z-10 translate-x-[25%] rounded-xl bg-theo-navy p-2 text-center text-xs text-gray-300 shadow-xl">
      Rewards and part of principal slashed if unstaked while locked.
    </Popover.Panel>
  </Popover>
);

const UnstakeButton = ({ purchase, matured, account, signer, reRender }) => {
  // STAKE
  const { address, abi } = useContractInfo(purchase.contractName);
  const { address: sTheoAddress, abi: sAbi } = useContractInfo('sTheopetra');
  const { address: pTheoAddress, abi: pAbi } = useContractInfo('pTheopetra');
  const theoAddress = purchase.contractName === 'TheopetraStaking' ? sTheoAddress : pTheoAddress;
  const theoAbi = purchase.contractName === 'TheopetraStaking' ? sAbi : pAbi;
  const { data: stakingInfo } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'stakingInfo',
    {
      args: [account?.address, BigNumber.from(purchase.index).toNumber()],
      cacheTime: cache.cacheTimesInMs.prices,
    }
  );

  const amount = useMemo(() => {
    if (!stakingInfo) return 0;
    return (
      BigNumber.from(stakingInfo?.[0]).toNumber() + BigNumber.from(purchase.rewards).toNumber()
    );
  }, [stakingInfo, purchase]);

  const unstakeArgs = useMemo(
    () => [account?.address, [amount], false, [BigNumber.from(purchase.index).toNumber()]],
    [amount, purchase]
  );

  console.log(unstakeArgs);
  // APPROVE
  const {
    data: approveData,
    isLoading: approvalLoading,
    write: approve,
  } = useContractWrite(
    {
      addressOrName: theoAddress,
      contractInterface: theoAbi,
      signerOrProvider: signer,
    },
    'approve',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          unstake();
        } else {
          console.log('failed', receipt);
        }
      },
      onError(error) {
        console.log('failed 22', error);
      },
      args: [address, amount],
    }
  );

  // unstake
  const { write: unstake, isLoading: unstakeLoading } = useContractWrite(
    {
      addressOrName: address,
      contractInterface: abi,
      signerOrProvider: signer,
    },
    'unstake',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          cache.clear();
          reRender();
        }
      },
      onError(error) {
        console.log('error', error);
      },
      args: unstakeArgs,
    }
  );

  return (
    <>
      <button
        className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
        onClick={() => {
          approve();
        }}
      >
        {approvalLoading
          ? 'Approving...'
          : unstakeLoading
          ? 'Unstaking...'
          : `${matured ? 'Unstake' : 'Unstake Early'}`}
      </button>
      {!matured && <PenaltyPopover />}
    </>
  );
};
const YourMemberships = () => {
  const { data } = useAccount();
  const [{ memberships }] = useUserPurchases();
  const formattedPurchases = useMemo(
    () =>
      memberships?.map((p) => {
        const endDate = new Date(BigNumber.from(p.stakingInfo.stakingExpiry).toNumber() * 1000);
        const startDate =
          p.contractName === 'TheopetraStaking' ? endDate : add(new Date(endDate), { years: -1 });
        return {
          startDate,
          endDate,
          deposit: BigNumber.from(p.stakingInfo.deposit).toNumber(),
          rewards: p.rewards,
          contractName: p.contractName,
          index: p.index,
          matured: endDate < new Date(),
        };
      }),
    [memberships]
  );

  const [, { reRender }] = useUserPurchases();
  const { data: account } = useAccount();

  const { data: signer } = useSigner();

  const columns = useMemo(
    () => [
      {
        Header: 'Joined',
        accessor: 'startDate',
        width: '10%',
        Cell: ({ value }) => format(value, 'yyyy-MM-dd'),
      },
      {
        Header: 'THEO Committed',
        accessor: 'deposit',
        width: '10%',
        Cell: ({ value }) => formatTheo(value),
      },
      {
        Header: 'APY',
        accessor: 'contractName',
        width: '10%',
        Cell: ({ value }) => (value === 'TheopetraStaking' ? '5%' : '30%'),
      },
      {
        Header: 'Unlock Date',
        accessor: 'endDate',
        width: '10%',
        Cell: ({ value }) => format(value, 'yyyy-MM-dd'),
      },
      {
        Header: 'Rewards',
        accessor: 'rewards',
        width: '10%',
        Cell: ({ value, cell }) => (
          <div
            className="flex justify-center dark:text-white"
            title={formatTheo(BigNumber.from(value).toNumber(), 6)}
          >
            <div className={`text-lg font-bold`}>
              {formatTheo(BigNumber.from(value).toNumber(), 3)}
            </div>
            {/* <div>{format(cell.row.original.endDate, 'yyyy-MM-dd')}</div> */}
          </div>
        ),
      },

      {
        Header: 'Unstake',
        accessor: 'matured',
        width: '10%',
        Cell: ({ value: matured, cell }) => (
          <UnstakeButton
            purchase={cell.row.original}
            matured={matured}
            reRender={reRender}
            account={account}
            signer={signer}
          />
        ),
      },
    ],
    []
  );

  return (
    <PageContainer>
      {data?.address && formattedPurchases?.length > 0 && (
        <PurchasesTable columns={columns} data={formattedPurchases} />
      )}
      {data?.address && formattedPurchases?.length === 0 && (
        <div className="text-center dark:text-white">You have no active memberships.</div>
      )}
      {!data?.address && (
        <div className="text-center dark:text-white">Please connect your wallet.</div>
      )}
    </PageContainer>
  );
};
YourMemberships.PageStateProvider = (props) => <UserPurchasesProvider {...props} />;

YourMemberships.PageHead = () => {
  return <div>Your Memberships</div>;
};
export default YourMemberships;
