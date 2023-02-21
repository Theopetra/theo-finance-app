import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { add, format } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useAccount, useContract, useContractRead, useContractWrite, useSigner } from 'wagmi';
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
import { cache } from '@/lib/cache';
import { logEvent } from '@/lib/analytics';
import { useContractInfo } from '@/hooks/useContractInfo';
import { Popover } from '@headlessui/react';
const PenaltyPopover = () => (
  <Popover className="relative -mt-2  ">
    <Popover.Button>
      <div className="mx-auto flex whitespace-normal rounded p-1 text-[10px] leading-snug hover:bg-slate-200">
        10% penalty
      </div>
    </Popover.Button>

    <Popover.Panel className="trans absolute right-[50%] z-10  translate-x-[50%] rounded-xl bg-theo-navy p-2 text-center text-xs text-gray-300 shadow-xl">
      Unstaking early incurs a 10% penalty
    </Popover.Panel>
  </Popover>
);

// 100,274.21

// expecting 0.849

const UnstakeButton = ({ purchase, matured, account, theoAddress, signer, reRender }) => {
  // STAKE

  const { address, abi } = useContractInfo(purchase.contractName);
  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
  });

  // const ad = await contract.stakingInfo(account.address, purchase.index);
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
  const amount = stakingInfo?.gonsRemaining && BigNumber.from(stakingInfo?.gonsRemaining);
  console.log({ amount, stakingInfo });
  const unstakeArgs = [
    account?.address,
    [amount],
    false,
    [BigNumber.from(purchase.index).toNumber()],
  ];
  // APPROVE
  const {
    data: approveData,
    isLoading: approvalLoading,
    write: approve,
  } = useContractWrite(
    {
      addressOrName: theoAddress,
      contractInterface: [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ],
      signerOrProvider: signer,
    },
    'approve',
    {
      async onSuccess(data) {
        console.log({ unstakeArgs });
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'erc20_approved' });
          purchase.matured ? unstake() : claim();
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
          logEvent({ name: 'unstake_completed' });
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
  // claim
  const { write: claim, isLoading: claimLoading } = useContractWrite(
    {
      addressOrName: address,
      contractInterface: abi,
      signerOrProvider: signer,
    },
    'claim',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'claim_completed' });
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
  const { address: theoAddress } = useContractInfo('sTheopetra');

  const { data: signer } = useSigner();

  // POST-LAUNCH TODO: add button for redeem() when relevant
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
            theoAddress={theoAddress}
          />
        ),
      },
    ],
    []
  );

  return (
    <PageContainer>
      {data?.address && formattedPurchases?.length > 0 ? (
        <PurchasesTable columns={columns} data={formattedPurchases} />
      ) : (
        <p className="font-bold dark:text-white">Please connect your wallet.</p>
      )}
    </PageContainer>
  );
};

YourMemberships.PageHead = () => {
  return <div>Your Memberships</div>;
};
export default YourMemberships;
