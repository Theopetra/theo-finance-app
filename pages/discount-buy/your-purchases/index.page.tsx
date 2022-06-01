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
import { format } from 'date-fns';
import { useMemo } from 'react';
import DynamicText from '@/components/DynamicText';

const YourPurchases = () => {
  const data = useMemo(() => {
    const statuses = ['locked', 'claimed', 'unclaimed'];

    return [
      {
        date: randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
        txId: randMask({ mask: 'B####' }),
        amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
        discount: `${randNumber({ min: 6, max: 12 })}%`,
        unlockDate: randFutureDate(),
        status: rand(statuses),
        etherscan: (
          <a href="https://etherscan.io/" className="text-center">
            <LinkIcon className="inline w-5 text-theo-cyan" />
          </a>
        ),
      },
      {
        date: randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
        txId: randMask({ mask: 'B####' }),
        amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
        discount: `${randNumber({ min: 6, max: 12 })}%`,
        unlockDate: randFutureDate(),
        status: rand(statuses),
        etherscan: (
          <a href="https://etherscan.io/" className="text-center">
            <LinkIcon className="inline w-5 text-theo-cyan" />
          </a>
        ),
      },
    ];
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => format(value, 'MMM-dd-yy'),
        width: '10%',
      },
      {
        Header: 'Tx ID',
        accessor: 'txId',
        disableSortBy: true,
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
      {
        Header: 'Etherscan',
        accessor: 'etherscan',
        disableSortBy: true,
        width: '15%',
      },
    ],
    []
  );

  return (
    <PageContainer>
   
      <PurchasesTable
        columns={columns}
        data={[]}
      />
    </PageContainer>
  );
};

YourPurchases.PageHead = () => {
  return <div>Your Purchases</div>;
};

export default YourPurchases;
