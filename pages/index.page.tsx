import Card from '@/components/Card';
import CardList from '@/components/CardList';
import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import { useContractInfo } from '@/hooks/useContractInfo';
import { Fragment, useMemo } from 'react';
import { BigNumber } from 'ethers';
import { formatTheo } from '@/lib/format_theo';
import { useContract, useContractRead } from 'wagmi';

const useGetLockedTheoByContract = async (contractName) => {
  const { address, abi } = useContractInfo(contractName);
  const contract = useContract({ addressOrName: address, contractInterface: abi });
  const { data } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getMarkets'
  );

  let locked = [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)];
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

    // 15768000 - 6 months
    // 31536000 - 12 months
    // 47304000 - 18 months

    locked = [15768000, 31536000, 47304000].map((v) => {
      return merged
        .filter((e: any) => e.term.fixedTerm && e.term.vesting === v)
        .reduce((prev, cur: any) => prev.add(cur.market.sold), BigNumber.from(0));
    });
  }

  return locked;
};

const Dashboard = ({}) => {
  const whitelistRepo = useGetLockedTheoByContract('WhitelistTheopetraBondDepository');
  const bondRepo = useGetLockedTheoByContract('TheopetraBondDepository');
  const publicPreListRepo = useGetLockedTheoByContract('PublicPreListBondDepository');
  const locked = useMemo(() => {
    return [0, 1, 2].map((i) => [
      whitelistRepo[i]?.add(bondRepo[i])?.add(publicPreListRepo[i])?.toString(),
    ]);
  }, [whitelistRepo, bondRepo, publicPreListRepo]);

  const STATS = useMemo(
    () => [
      {
        name: (
          <>
            TOTAL $THEO Locked
            <br />
            <strong>6 Months</strong>
          </>
        ),
        value: formatTheo(locked?.[0]?.toString() || 0),
        tooltip: 'This is the total amount of $THEO locked in the 6 Month contract',
        tooltipIcon: 'info',
      },
      {
        name: (
          <>
            TOTAL $THEO Locked
            <br />
            <strong>12 Months</strong>
          </>
        ),
        value: formatTheo(locked?.[1]?.toString() || 0),
        tooltip: 'This is the total amount of $THEO locked in the 12 Month contract',
        tooltipIcon: 'info',
      },
      {
        name: (
          <>
            TOTAL $THEO Locked
            <br />
            <strong>18 Months</strong>
          </>
        ),
        value: formatTheo(locked?.[2]?.toString() || 0),
        tooltip: 'This is the total amount of $THEO locked in the 18 Month contract',
        tooltipIcon: 'info',
      },
    ],
    [locked]
  );

  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <CardList>
          {STATS.map((props, i) => (
            <Fragment key={i}>
              <StatCard {...props} />
            </Fragment>
          ))}
        </CardList>
        <div className="mt-4">
          <div className="mb-14 flex flex-col gap-x-2 space-x-0 space-y-4 sm:space-x-2  md:flex-row">
            <Card>
              <iframe
                className="mt-4 w-full"
                id="ytplayer"
                width="720"
                height="405"
                src="https://www.youtube.com/embed/YDsKambUAR8?modestbranding=1&color=white"
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
