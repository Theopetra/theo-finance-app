import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useContract, useContractRead, useProvider } from 'wagmi';
import { useContractInfo } from './useContractInfo';

export type Metric = {
  createdAt: string;
  createdBy: string;
  id: number;
  lockedTheo: number;
  uniqueWallets: number;
};
export type MetricsResponse = Metric[];

const useMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsResponse>();
  const [currentMetrics, setCurrentMetrics] = useState<Metric>();
  const [groupedBondMarketsMap, setGroupedBondMarketsMap] = useState({});

  const limit = 5;
  const { address: whitelistBondDepo, abi: whitelistAbi } = useContractInfo(
    'WhitelistTheopetraBondDepository',
    1
  );
  const { address, abi } = useContractInfo('WhitelistTheopetraBondDepository', 1);
  const { data: WhitelistBondMarkets, isSuccess: WhitelistBondMarketsSuccess } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'liveMarkets'
  );
  const provider = useProvider();
  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const termsMap = {};
    // Combine whitelist and premarket markets
    const combinedMarkets = [];
    if (WhitelistBondMarketsSuccess) {
      const setTerms =
        WhitelistBondMarkets?.map(
          async (bondMarket) =>
            await contract
              .terms(bondMarket)
              .then(async (terms) => {
                const vestingInMonths = Math.floor(terms.vesting / 60 / 60 / 24 / 30);
                const mapKey = vestingInMonths;

                const market = await contract.markets(bondMarket).then((market) => market);

                return (termsMap[mapKey] = {
                  header: mapKey,
                  highlight: vestingInMonths === 18,
                  markets: [
                    ...(termsMap?.[mapKey] ? termsMap?.[mapKey].markets : []),
                    {
                      ...terms,
                      sold: BigNumber.from(market.sold).toNumber(),
                    },
                  ],
                });
              })
              .catch((err) => console.log(err.stack))
        ) || [];

      Promise.allSettled(setTerms).then(([result]) => {
        setGroupedBondMarketsMap(termsMap);
      });
    }
  }, [contract, WhitelistBondMarkets, WhitelistBondMarketsSuccess]);

  const fetchMetrics = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/metrics?limit=${limit}`
    );

    if (!response.ok) {
      console.log(`An error has occured: ${response}`);
    }
    const metricsData = await response.json();
    setMetrics(metricsData);
    setCurrentMetrics(metricsData[0]);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return { metrics, currentMetrics, groupedBondMarketsMap };
};

export default useMetrics;
