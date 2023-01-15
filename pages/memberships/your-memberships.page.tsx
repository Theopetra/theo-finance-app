import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import PurchasesTable from '../discount-buy/your-purchases/components/PurchasesTable';
const whitelistExpiry = parseInt(process.env.NEXT_PUBLIC_WHITELIST_EXPIRY_EPOCH_SECONDS || '0');

const YourMemberships = () => {
  const { data, status } = useAccount();
  const [{ memberships }] = useUserPurchases();
  const formattedPurchases = useMemo(
    () =>
      memberships?.map((p) => {
        return {
          date: new Date(p.created_ * 1000),
          amount: 'x',
          discount: p.created_ < whitelistExpiry ? `Pre-Market` : p.discount_,
          unlockDate: new Date(p.expiry_ * 1000),
          status: 'Locked',
        };
      }),
    [memberships]
  );

  // POST-LAUNCH TODO: add button for redeem() when relevant
  const columns = useMemo(
    () => [
      {
        Header: 'Purchased Date',
        accessor: (c) => c.date,
        Cell: ({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss zzzz'),
        width: '10%',
      },
      {
        Header: '$THEO Purchased',
        accessor: ({ amount }) => {
          const string = amount.replace(/[^\d\.\-]/g, '');
          return parseFloat(string);
        },
        Cell: ({ value }) => value.toLocaleString(),
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
        accessor: (c) => c.unlockDate,
        Cell: ({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss zzzz'),

        width: '15%',
      },
    ],
    []
  );

  return (
    <PageContainer>
      ewe
      {/* {data?.address && formattedPurchases?.length > 0 ? (
        // <PurchasesTable columns={columns} data={formattedPurchases} />
      ) : (
        <p className="font-bold dark:text-white">Please connect your wallet.</p>
      )} */}
    </PageContainer>
  );
};

YourMemberships.PageHead = () => {
  return <div>Your Memberships</div>;
};
export default YourMemberships;
