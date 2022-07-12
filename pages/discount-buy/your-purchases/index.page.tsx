import PageContainer from '@/components/PageContainer';
import { useContractInfo } from '@/hooks/useContractInfo';
import { formatTheo } from '@/lib/format_theo';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import PurchasesTable from './components/PurchasesTable';

const usePurchasesByContract = (contractName) => {
  const { data } = useAccount();
  const { address, abi } = useContractInfo(contractName);
  const [pendingNotes, setPendingNotes] = useState<any[]>([]);
  const provider = useProvider();
  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function callContract() {
      if (contract && data?.address) {
        const indexes = await contract.indexesFor(data?.address);
        const pnPromises = indexes.map((i) => contract.pendingFor(data?.address, i));
        const pn = await Promise.all(pnPromises);
        setPendingNotes(pn);
      }
    }
    callContract();
  }, [contract, data?.address]);

  return pendingNotes;
};

export const useUserPurchases = () => [
  ...usePurchasesByContract('WhitelistTheopetraBondDepository'),
  ...usePurchasesByContract('PublicPreListBondDepository'),
];

const YourPurchases = () => {
  const { data, status } = useAccount();
  const purchases = useUserPurchases();
  const formattedPurchases = purchases.map((p) => {
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
        Header: 'Date',
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
        Header: 'Unlock Date',
        accessor: 'unlockDate',
        Cell: ({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss zzzz'),
        width: '15%',
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: '10%',
        Cell: ({ value }) => <div className="flex justify-center">{value}</div>,
      },
    ],
    []
  );

  return (
    <PageContainer>
      {data?.address ? (
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
