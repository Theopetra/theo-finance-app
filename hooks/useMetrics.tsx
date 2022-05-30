import { useEffect, useState } from 'react';

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
  const limit = 5;

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

  return { metrics, currentMetrics };
};

export default useMetrics;
