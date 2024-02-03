import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { BondDepoNameType } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { TermsWithMarket } from '@/pages/market-cards/state/use-buy-form';
import { Abi, formatEther } from 'viem';
import { useContractRead, useToken } from 'wagmi';

export const TokenPrice = ({
  market,
  bondDepoName,
  marketIds
}: {
  bondDepoName: BondDepoNameType;
  market: TermsWithMarket;
  marketIds: number[];
}) => {
  const id = market?.id;
  const quoteToken = market?.marketData.quoteToken;
  const { data: token } = useToken({ address: quoteToken });
  const { address, abi } = useActiveBondDepo(bondDepoName);
  const prices: string[] = marketIds.map((id) => {
    const {
      data: priceInfo,
      isError,
      error,
      isSuccess,
    } = useContractRead({
      address: address,
      abi: abi as Abi,
      functionName: 'calculatePrice',
      args: [id || BigInt(0)],
      cacheTime: cache.cacheTimesInMs.prices,
    });

    if (isSuccess) {
      return priceInfo as string;
    }

    if (isError) {
      console.log({ error });
      return "-1";
    };
      return "-2";
  })

  const averagePrice = BigInt(prices.reduce((p, c) => (BigInt(c) + BigInt(p)).toString())) / BigInt(prices.length);
  return <>{token?.symbol === 'USDC' ? Number(averagePrice).toFixed(2) : (Number(averagePrice) / Math.pow(10, 9)).toFixed(9)}</>
};
