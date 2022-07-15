import Card from '@/components/Card';
import CardList from '@/components/CardList';
import DynamicText from '@/components/DynamicText';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useContractInfo } from '@/hooks/useContractInfo';
import { useProvider } from 'wagmi';
import useMetrics from '@/hooks/useMetrics';
import { useTheme } from '@/state/ui/theme';
import { Fragment, useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { formatTheo } from '@/lib/format_theo';

const verbose = process.env.NODE_ENV !== 'production';

function log(msg, val) {
  if (verbose) {
    console.log(msg);
    console.log(val);
  }
}

function useLockedTheoByContract(contractName) {
  const { address, abi } = useContractInfo(contractName);
  const provider = useProvider();

  const [locked, setLocked] = useState([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)]);

  useEffect(() => {
    // TODO: verify this works once there is test data
    async function getData() {
      const contract = new ethers.Contract(address, abi, provider);
      const data = await contract.liveMarkets();
      // const data = await contract.getMarkets();
      log('markets for ' + contractName, data);

      if (data) {
        const merged = await Promise.all(
          data.map(async (b) => {
            return {
              marketId: b,
              market: await contract.markets(b),
              term: await contract.terms(b),
            };
          })
        );

        log('merged for ' + contractName, merged);

        // 15768000 - 6 months
        // 31536000 - 12 months
        // 47304000 - 18 months

        const locked = [15768000, 31536000, 47304000].map((v) => {
          return merged
            .filter((e: any) => e.term.fixedTerm && e.term.vesting === v)
            .reduce((prev, cur: any) => prev.add(cur.market.sold), BigNumber.from(0));
        });

        log('locked for ' + contractName, locked);

        setLocked(locked);
      }
    }
    getData();
  }, [provider, abi, address, contractName]);

  return locked;
}

function useLockedTheo() {
  const whitelistRepo = useLockedTheoByContract('WhitelistTheopetraBondDepository');
  const bondRepo = useLockedTheoByContract('TheopetraBondDepository');
  const publicPreListRepo = useLockedTheoByContract('PublicPreListBondDepository');

  return [0, 1, 2].map((i) => [whitelistRepo[i].add(bondRepo[i]).add(publicPreListRepo[i])]);
}

const Dashboard = ({ currentMetrics }) => {
  const [{ theme }] = useTheme();
  const locked = useLockedTheo();

  const STATS = [
    {
      name: (
        <>
          $THEO Locked - <strong>6 Months</strong>
        </>
      ),
      value: formatTheo(locked?.[0].toString()),
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
      tooltipIcon: 'lock-laminated',
    },
    {
      name: (
        <>
          $THEO Locked - <strong>12 Months</strong>
        </>
      ),
      value: formatTheo(locked?.[1]?.toString()),
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
      tooltipIcon: 'lock-laminated',
    },
    {
      name: (
        <>
          $THEO Locked - <strong>18 Months</strong>
        </>
      ),
      value: formatTheo(locked?.[2]?.toString()),
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
      tooltipIcon: 'lock-laminated',
    },
  ];

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <CardList >
          {STATS.map((props, i) => (
            <Fragment key={i}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <Card
              title={'Total Unique Wallets'}
              darkModeBgColor={'bg-black dark:bg-none'}
              className="basis-1/3"
            >
              <div className="mb-24 flex-1 pb-10 md:m-0">
                <div className="h-full flex-1">
                  <div className="sr-only">Total Wallets Graph</div>
                  <div className="text-3xl font-bold">
                    <DynamicText value={currentMetrics?.uniqueWallets} />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="basis-2/3">
              <iframe
                className="mt-4 w-full"
                id="ytplayer"
                width="720"
                height="405"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?modestbranding=1&color=white"
                frameBorder="0"
                allowFullScreen
              />
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

Dashboard.PageHead = () => {
  return <div>Welcome Home</div>;
};

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/metrics`);

  if (!response.ok) {
    console.log(`An error has occured: ${response}`);
  }

  const metricsData = await response.json();

  return {
    props: { currentMetrics: metricsData?.[0] },
  };
}

export default Dashboard;
