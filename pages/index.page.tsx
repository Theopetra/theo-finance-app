import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useTheme } from '@/state/ui/theme';
import { Fragment } from 'react';
import { useAccount, useBalance } from 'wagmi';

const STATS = [
  {
    name: 'Your THEO Holdings',
    value: '24,000',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: 'Your Staked THEO',
    value: '21,000',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
  {
    name: 'Total THEO Earned',
    value: '800',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur..',
  },
];
const PROPERTY_MANAGEMENT = [
  {
    title: 'New Wallets',
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
  const { data: account, isError: accountIsError, isLoading: accountIsLoading } = useAccount();
  const {
    data: balance,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
  } = useBalance({ addressOrName: account?.address });
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
        <div className="text-white">
          {accountIsLoading && <div>Loading account…</div>}
          {accountIsError && <div>Error loading account</div>}
          <div>{account?.address}</div>
          <div>
            Balance: {balance?.formatted} {balance?.symbol}
          </div>
        </div>
      </div>
      <PageContainer>
        <CardList horizontalScroll>
          {STATS.map((props) => (
            <Fragment key={props.name}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <div className="mt-4">
          <div className="mb-14 flex flex-col space-x-0 space-y-4 sm:space-x-2 sm:space-y-0 md:flex-row">
            {PROPERTY_MANAGEMENT.map((x) => (
              <Card title={x.title} key={x.title} darkModeBgColor={'bg-black dark:bg-none'}>
                <Fragment>
                  <div className="mb-24 flex-1 md:m-0">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={theme === 'dark' ? x.darkImgSrc : x.lightImgSrc}
                        alt={`${x.title} graphic`}
                        className="mb-7 max-h-[200px]"
                      />
                    </div>
                  </div>
                </Fragment>
              </Card>
            ))}
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
