import ActionCard from '@/components/ActionCard';
import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import { useRouter } from 'next/router';
import { ArrowUpRight } from 'phosphor-react';

const Dashboard = ({}) => {
  const router = useRouter();
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <div className="flex w-full space-x-4">
              <ActionCard
                icon={<img src="/images/your-purchases.svg" alt="Y" />}
                header={{ primary: 'Moby' }}
                data={[
                  {
                    label: 'Type',
                    value: (
                      <a href="#" className="underline">
                        24/7 Microspaces
                        <ArrowUpRight className=" inline-block h-6 w-6" />
                      </a>
                    ),
                  },
                  { label: 'Avg Cost/Unit', value: '$5,500' },
                ]}
                actionButton={{
                  label: 'Buy THEO',
                  onClick: () => router.push('/discount-buy-moby'),
                }}
              />
              <ActionCard
                icon={<img src="/images/your-purchases.svg" alt="Y" />}
                header={{ primary: 'T Home' }}
                data={[
                  {
                    label: 'Type',
                    value: (
                      <a href="#" className="underline">
                        Affordable Housing <ArrowUpRight className=" inline-block h-6 w-6" />
                      </a>
                    ),
                  },
                  { label: 'Avg Cost/Unit', value: '$125,000' },
                ]}
                actionButton={{
                  label: 'Buy THEO',
                  onClick: () => router.push('/discount-buy'),
                }}
              />
            </div>
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
