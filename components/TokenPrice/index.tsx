import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { BigNumber } from 'ethers';
import { useContractRead, useToken } from 'wagmi';

export const WhitelistTokenPrice = ({ marketId: id, quoteToken }) => {
  const { data: token } = useToken({ address: quoteToken });

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
    'calculatePrice',
    { args: id || BigNumber.from(0), cacheTime: cache.cacheTimesInMs.prices }
  );

  if (isSuccess) {
    const output = (BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9)).toFixed(5);
    return <>{token?.symbol === 'USDC' ? Number(output).toFixed(2) : output}</>;
  }

  if (isError) {
    console.log(error);

    return <></>;
  }
  return <></>;
};
