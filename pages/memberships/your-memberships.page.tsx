import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { add, format } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
const UnstakeButton = ({ purchase }) => (
  <button
    className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
    onClick={() => {}}
  >
    Unstake
  </button>
);
const YourMemberships = () => {
  const { data, status } = useAccount();
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
          rewards: BigNumber.from(p.rewards).toNumber(),
          status: p.contractName === 'TheopetraStaking' ? 'unlocked' : 'locked',
          type: p.contractName,
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
        accessor: '',
        width: '10%',
        Cell: ({ value }) => '?',
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
        Cell: ({ value }) => <div className="flex justify-center">{value}</div>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: '10%',
        Cell: ({ value }) => <div className="flex justify-center">{value}</div>,
      },
      {
        Header: 'Unstake',
        accessor: '',
        width: '10%',
        Cell: ({ value: matured, cell }) => <UnstakeButton purchase={cell.row.original} />,
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
