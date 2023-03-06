import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import useStats from '@/hooks/StatsList';
import { Fragment } from 'react';

const Dashboard = ({}) => {
  // const { stats } = useStats();

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        {/* <CardList>
          {stats.map((props, i) => (
            <Fragment key={i}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList> */}
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <Card>
              <iframe
                className="mt-4 w-full"
                id="ytplayer"
                width="720"
                height="405"
                src="https://www.youtube.com/embed/YDsKambUAR8?modestbranding=1&color=white"
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
