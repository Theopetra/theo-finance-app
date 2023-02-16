import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { add, format } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
import { cache } from '@/lib/cache';
import { logEvent } from '@/lib/analytics';
import { useContractInfo } from '@/hooks/useContractInfo';
import { parseUnits } from 'ethers/lib/utils';

const UnstakeButton = ({ purchase, matured }) => {
  // STAKE
  const [, { reRender }] = useUserPurchases();
  const { data: account } = useAccount();
  const { address, abi } = useContractInfo(purchase.contractName);
  const { address: theoAddress } = useContractInfo('sTheopetra');

  const { data: signer } = useSigner();

  const amount = BigNumber.from(purchase.rewards).toNumber();
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
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'erc20_approved' });
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
  return (
    <button
      className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
      onClick={() => {
        approve();
      }}
      disabled={!matured || approvalLoading || unstakeLoading}
    >
      {approvalLoading ? 'Approving...' : unstakeLoading ? 'Unstaking...' : 'Unstake'}
    </button>
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
        Cell: ({ value }) => (
          <div className="flex justify-center">{formatTheo(BigNumber.from(value).toNumber())}</div>
        ),
      },

      {
        Header: 'Unstake',
        accessor: 'matured',
        width: '10%',
        Cell: ({ value: matured, cell }) => (
          <UnstakeButton purchase={cell.row.original} matured={matured} />
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
