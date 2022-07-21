import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUserPurchases } from '../state/use-user-purchases';
import PurchasesTable from './components/PurchasesTable';

const YourPurchases = () => {
  const { data, status } = useAccount();
  const [{ purchases }] = useUserPurchases();

  const formattedPurchases = purchases?.map((p) => {
    return {
      date: new Date(p.created_ * 1000),
      amount: `${formatTheo(p.payout_)}`,
      // POST-LAUNCH TODO: show pre-market for purchases before public bond depo, else discount_
      discount: `Pre-Market`,
      unlockDate: new Date(p.expiry_ * 1000),
      status: 'Locked',
    };
  });

  // POST-LAUNCH TODO: add button for redeem() when relevant
  const columns = useMemo(
    () => [
      {
        Header: 'Purchased Date',
        accessor: 'date',
        Cell: ({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss zzzz'),
        width: '10%',
      },
      {
        Header: '$THEO Purchased',
        accessor: 'amount',
        width: '20%',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
        width: '10%',
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: '10%',
        Cell: ({ value }) => <div className="flex justify-center">{value}</div>,
      },
      {
        Header: 'Unlock Date',
        accessor: 'unlockDate',
        Cell: ({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss zzzz'),
        width: '15%',
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

YourPurchases.PageHead = () => {
  return <div>Your Purchases</div>;
};
export default YourPurchases;
