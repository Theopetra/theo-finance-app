import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useTheme } from '@/state/ui/theme';
import { Fragment } from 'react';

const STATS = [
  {
    name: (
      <>
        THEO Locked - <strong>6 Months</strong>
      </>
    ),
    value: '24,000',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
    tooltipIcon: 'lock-laminated',
  },
  {
    name: (
      <>
        THEO Locked - <strong>6 Months</strong>
      </>
    ),
    value: '21,000',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
    tooltipIcon: 'lock-laminated',
  },
  {
    name: (
      <>
        THEO Locked - <strong>6 Months</strong>
      </>
    ),
    value: '800',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
    tooltipIcon: 'lock-laminated',
  },
];
const PROPERTY_MANAGEMENT = [
  {
    title: 'Total Unique Wallets',
    darkImgSrc: '/assets/images/dashboard/Ismetric_building_both_versions.png',
    lightImgSrc: '/assets/images/dashboard/Ismetric_building_both_versions.png',
  },
  {
    title: 'Market Cap',
    darkImgSrc: '/assets/images/dashboard/Graph_dark_version.png',
    lightImgSrc: '/assets/images/dashboard/Graph_light_version.png',
  },
];

const Dashboard = () => {
  const [{ theme }] = useTheme();

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
          <div className="mb-14 gap-x-2 space-x-0 space-y-4 sm:space-x-2 sm:space-y-0 flex flex-col md:flex-row">
            <Card
              title={'Total Unique Wallets'}
              darkModeBgColor={'bg-black dark:bg-none'}
              className="basis-1/3"
            >
              <Fragment>
                <div className="mb-24 flex-1 md:m-0">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={
                        theme === 'dark'
                          ? '/assets/images/dashboard/Ismetric_building_both_versions.png'
                          : '/assets/images/dashboard/Ismetric_building_both_versions.png'
                      }
                      alt="Total Unique Wallets graphic"
                      className="mb-7 max-h-[200px]"
                    />
                  </div>
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
