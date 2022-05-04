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

const YourPurchases = () => {
  const statuses = ['locked', 'claimed', 'unclaimed'];
  const data = useMemo(
    () => [
      {
        date: format(
          randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
          'MMM-dd-yy'
        ),
        txId: randMask({ mask: 'B####' }),
        amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
        discount: randNumber({ min: 6, max: 12 }),
        unlockDate: format(randFutureDate(), 'MMM-dd-yy'),
        status: rand(statuses),
        etherscan: (
          <a href="https://etherscan.io/">
            <LinkIcon className="w-4 text-theo-cyan" />
          </a>
        ),
      },
      {
        date: format(
          randBetweenDate({ from: new Date('10/07/2020'), to: new Date() }),
          'MMM-dd-yy'
        ),
        txId: randMask({ mask: 'B####' }),
        amount: `${randFloat({ min: 800, max: 2000, fraction: 2 }).toLocaleString()}`,
        discount: randNumber({ min: 6, max: 12 }),
        unlockDate: format(randFutureDate(), 'MMM-dd-yy'),
        status: rand(statuses),
        etherscan: (
          <a href="https://etherscan.io/">
            <LinkIcon className="w-4 text-theo-cyan" />
          </a>
        ),
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        // accessor is the "key" in the data
        accessor: 'date',
        className: 'text-left',
      },
      {
        Header: 'Tx ID',
        accessor: 'txId',
        disableSortBy: true,
      },
      {
        Header: 'Amount Purchased',
        accessor: 'amount',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Unlock Date',
        accessor: 'unlockDate',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Etherscan',
        accessor: 'etherscan',
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <PageContainer>
      <PurchasesTable
        columns={columns}
        data={data.map((x) => ({
          ...x,
          status:
            x.status === 'unclaimed' ? <button className="border-button">Claim</button> : x.status,
        }))}
      />
    </PageContainer>
  );
};

YourPurchases.PageHead = () => {
  return 'Your Purchases';
};

export default YourPurchases;
