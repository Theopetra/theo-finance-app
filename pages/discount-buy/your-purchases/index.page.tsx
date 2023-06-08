import PageContainer from '@/components/PageContainer';
import { formatTheo } from '@/lib/format_theo';
import ConfirmClaim from '@/pages/claim/components/ConfirmClaim';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { format } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUserPurchases } from '../state/use-user-purchases';
import { UserPurchasesProvider } from '../state/UserPurchasesProvider';
import PurchasesTable from './components/PurchasesTable';
const whitelistExpiry = parseInt(process.env.NEXT_PUBLIC_WHITELIST_EXPIRY_EPOCH_SECONDS || '0');

const YourPurchases = () => {
  const { data, status } = useAccount();
  const [{ purchases }] = useUserPurchases();
  const [, { openModal }] = useModal();
  const ClaimButton = ({ purchase }) => (
    <button
      className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
      disabled={!purchase.matured_}
      onClick={() => {
        openModal(<ConfirmClaim purchase={purchase} />);
      }}
    >
      Claim THEO
    </button>
  );
  const formattedPurchases = useMemo(
    () =>
      purchases?.map((p) => {
        const unlockDate = new Date(BigNumber.from(p.expiry_).toNumber() * 1000);
        const created = new Date(BigNumber.from(p.created_).toNumber() * 1000);

        return {
          date: created,
          amount: `${formatTheo(p.payout_)}`,
          discount: p.created_ < whitelistExpiry ? `Discount Market` : p.discount_,
          unlockDate,
          ...p,
        };
      }),
    [purchases]
  );

  // POST-LAUNCH TODO: add button for redeem() when relevant
  const columns = useMemo(
    () => [
      {
        Header: 'Purchased Date',
        accessor: (c) => c.date,
        Cell: ({ value }) => (
          <span title={format(value, 'yyyy-MM-dd HH:mm:ss zzzz')}>
            {format(value, 'yyyy-MM-dd')}
          </span>
        ),
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
        accessor: 'matured_',
        width: '10%',
        Cell: ({ value: matured, cell }) => (
          <div className="flex justify-center">
            {matured ? <ClaimButton purchase={cell.row.original} /> : 'Locked'}
          </div>
        ),
      },
      {
        Header: 'Unlock Date',
        accessor: (c) => c.unlockDate,
        Cell: ({ value }) => (
          <span title={format(value, 'yyyy-MM-dd HH:mm:ss zzzz')}>
            {format(value, 'yyyy-MM-dd')}
          </span>
        ),
        width: '15%',
      },
    ],
    []
  );

  return (
    <PageContainer>
      {data?.address && formattedPurchases?.length > 0 ? (
        <PurchasesTable columns={columns} data={formattedPurchases} />
      ) : data?.address && formattedPurchases?.length === 0 ? (
        <div className="text-center font-bold dark:text-white">You have no purchases.</div>
      ) : (
        <div className="text-center font-bold dark:text-white">Please connect your wallet.</div>
      )}
    </PageContainer>
  );
};
YourPurchases.PageStateProvider = (props) => <UserPurchasesProvider {...props} />;

YourPurchases.PageHead = () => {
  return <div>Your Purchases</div>;
};

export default YourPurchases;
