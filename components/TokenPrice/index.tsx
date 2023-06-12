import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { cache } from '@/lib/cache';
import { Abi, formatEther } from 'viem';
import { useContractRead, useToken } from 'wagmi';

export const TokenPrice = ({ market }) => {
  const id = market.id;
  const quoteToken = market.marketData.quoteToken;
  const { data: token } = useToken({ address: quoteToken });
  const { address, abi } = useActiveBondDepo();
  const {
    data: priceInfo,
    isError,
    error,
    isSuccess,
  } = useContractRead({
    address: address,
    abi: abi as Abi,
    functionName: 'marketPrice',
    args: [id || BigInt(0)],
    cacheTime: cache.cacheTimesInMs.prices,
  });
  if (isSuccess) {
    const output = (Number(BigInt(priceInfo as bigint)) / Math.pow(10, 9)).toFixed(9);
    return <>{token?.symbol === 'USDC' ? Number(output).toFixed(2) : output}</>;
  }

  if (isError) {
    console.log({ error });

    return <>-1</>;
  }
  return <>-2</>;
};
