import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { BigNumber } from 'ethers';
import { useContractRead, useToken } from 'wagmi';

export const TokenPrice = ({ marketId: id, quoteToken }) => {
  const { data: token } = useToken({ address: quoteToken });
  // Discount Rate = Percent(1 - (marketPrice / valuationPrice));

  const { address, abi } = useActiveBondDepo();
  const {
    data: priceInfo,
    isError,
    error,
    isSuccess,
  } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'marketPrice',
    { args: id || BigNumber.from(0), cacheTime: cache.cacheTimesInMs.prices }
  );

  if (isSuccess) {
    const output = (BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9)).toFixed(9);
    return <>{token?.symbol === 'USDC' ? Number(output).toFixed(2) : output}</>;
  }

  if (isError) {
    console.log({ error });

    return <>-1</>;
  }
  return <>-2</>;
};
