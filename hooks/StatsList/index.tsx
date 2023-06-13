import { useContractInfo } from '@/hooks/useContractInfo';
import { formatTheo } from '@/lib/format_theo';
import { useMemo } from 'react';
import { Abi } from 'viem';
import { useContractRead } from 'wagmi';
import { getContract } from 'wagmi/actions';
const useGetLockedTheoByContract = async (contractName) => {
  const { address, abi } = useContractInfo(contractName);
  const contract = getContract({ address: address, abi: abi as Abi });
  const { data }: { data: any } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'getMarkets',
  });

  let locked = [BigInt(0), BigInt(0), BigInt(0)];
  if (data) {
    const merged = await Promise.all(
      data.map(async (b) => {
        return {
          marketId: b,
          market: await contract.read.markets(b),
          term: await contract.read.terms(b),
        };
      })
    );

    // 15768000 - 6 months
    // 31536000 - 12 months
    // 47304000 - 18 months

    locked = [15768000, 31536000, 47304000].map((v) => {
      return merged
        .filter((e: any) => e.term.fixedTerm && e.term.vesting === v)
        .reduce((prev, cur: any) => prev.add(cur.market.sold), BigInt(0));
    });
  }

  return locked;
};

const useStats = () => {
  const whitelistRepo = useGetLockedTheoByContract('WhitelistTheopetraBondDepository');
  const bondRepo = useGetLockedTheoByContract('TheopetraBondDepository');
  const publicPreListRepo = useGetLockedTheoByContract('PublicPreListBondDepository');
  const locked = useMemo(() => {
    return [0, 1, 2].map((i) =>
      whitelistRepo[i]?.add(bondRepo[i])?.add(publicPreListRepo[i])?.toString()
    );
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
        value: formatTheo(BigInt(locked?.[0] || 0)),
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
        value: formatTheo(locked?.[1] || 0),
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
        value: formatTheo(locked?.[2] || 0),
        tooltip: 'This is the total amount of $THEO locked in the 18 Month contract',
        tooltipIcon: 'info',
      },
    ],
    [locked]
  );

  return { stats: STATS };
};
export default useStats;
