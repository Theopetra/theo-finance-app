import { useContractInfo } from '@/hooks/useContractInfo';
import { BigNumber } from 'ethers';
import { useContractRead, useToken } from 'wagmi';

export const TokenInfo = (quoteToken: string) => {
  const { data: token, isLoading, isError } = useToken({ address: quoteToken });

  return token;
};

export const WhitelistTokenPrice = ({ marketId: id, quoteToken }) => {
  const { data: token } = useToken({ address: quoteToken });

  const { address, abi } = useContractInfo('WhitelistTheopetraBondDepository', 1);
  const { data: priceInfo } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'calculatePrice',
    { args: id }
  );
  if (!id) return <></>;

  const output = (BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9)).toFixed(5);

  return <>{token?.symbol === 'USDC' ? Number(output).toFixed(2) : output}</>;
};
