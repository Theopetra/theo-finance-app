import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import useMetrics from '@/hooks/useMetrics';
import { useTheme } from '@/state/ui/theme';
import { Fragment } from 'react';

const Dashboard = () => {
  const [{ theme }] = useTheme();
  const { currentMetrics } = useMetrics();
  const STATS = [
    {
      name: (
        <>
          THEO Locked - <strong>6 Months</strong>
        </>
      ),
      value: currentMetrics?.lockedTheo,
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
      tooltipIcon: 'lock-laminated',
    },
    {
      name: (
        <>
          THEO Locked - <strong>12 Months</strong>
        </>
      ),
      value: currentMetrics?.lockedTheo,
      tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
      tooltipIcon: 'lock-laminated',
    },
    {
      name: (
        <>
          THEO Locked - <strong>18 Months</strong>
        </>
      ),
      value: currentMetrics?.lockedTheo,
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
        <CardList horizontalScroll>
          {STATS.map((props, i) => (
            <Fragment key={i}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2 sm:space-y-0 md:flex-row">
            <Card
              title={'Total Unique Wallets'}
              darkModeBgColor={'bg-black dark:bg-none'}
              className="basis-1/3"
            >
              <Fragment>
                <div className="mb-24 flex-1 md:m-0 pb-10">
                  <div className='flex-1 h-full'>
                    <div className="sr-only">Total Wallets Graph</div>
                  </div>
                  <div className="font-bold text-3xl">{currentMetrics?.uniqueWallets}</div>
                </div>
              </Fragment>
            </Card>
            <Card className="basis-2/3">
              <iframe
                className="w-full"
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

export default Dashboard;
