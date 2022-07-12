import PageContainer from '@/components/PageContainer';
import PurchasesTable from './components/PurchasesTable';
import { LinkIcon } from '@heroicons/react/solid';
import {
  rand,
  randBetweenDate,
  randFloat,
  randFutureDate,
  randMask,
  randNumber,
} from '@ngneat/falso';
import { addSeconds, format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import DynamicText from '@/components/DynamicText';
import { useContractInfo } from '@/hooks/useContractInfo';
import { useAccount, useContract, useProvider } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { formatTheo } from '@/lib/format_theo';

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

  return pendingNotes.map((n) => {
    return {
      date: new Date(n.created_ * 1000),
      amount: `${formatTheo(n.payout_)}`,
      discount: `${n.discount_}%`,
      unlockDate: new Date(n.expiry_ * 1000),
      status: 'Locked',
    };
  });
};

const YourPurchases = () => {
  const { data, status } = useAccount();
  const purchases = [
    ...usePurchasesByContract('WhitelistTheopetraBondDepository'),
    ...usePurchasesByContract('PublicPreListBondDepository'),
  ];

  // const txData = useMemo(() => {
  //   const statuses = ['locked', 'claimed', 'unclaimed'];

  //   return [
  //     {
  //       date: randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
  //       txId: randMask({ mask: 'B####' }),
  //       amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
  //       discount: `${randNumber({ min: 6, max: 12 })}%`,
  //       unlockDate: randFutureDate(),
  //       status: rand(statuses),
  //       etherscan: (
  //         <a href="https://etherscan.io/" className="text-center">
  //           <LinkIcon className="inline w-5 text-theo-cyan" />
  //         </a>
  //       ),
  //     },
  //     {
  //       date: randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
  //       txId: randMask({ mask: 'B####' }),
  //       amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
  //       discount: `${randNumber({ min: 6, max: 12 })}%`,
  //       unlockDate: randFutureDate(),
  //       status: rand(statuses),
  //       etherscan: (
  //         <a href="https://etherscan.io/" className="text-center">
  //           <LinkIcon className="inline w-5 text-theo-cyan" />
  //         </a>
  //       ),
  //     },
  //   ];
  // }, []);

  // POST-LAUNCH TODO: add button for redeem() when relevant
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => format(value, 'MMM-dd-yy'),
        width: '10%',
      },
      {
        Header: 'Amount Purchased',
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
        Cell: ({ value }) => format(value, 'MMM-dd-yy'),
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
        <PurchasesTable columns={columns} data={purchases} />
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
