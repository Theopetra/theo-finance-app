import { useContractInfo } from '@/hooks/useContractInfo';
import { BigNumber, ethers } from 'ethers';
import { useContractRead, useToken } from 'wagmi';

export const TokenInfo = (quoteToken: string) => {
  const { data: token, isLoading, isError } = useToken({ address: quoteToken });

  return token;
};

export const useGetWhitelistTokenPrice = async ({ marketId: id, quoteToken, chainId = 4 }) => {
  const { address, abi } = useContractInfo('WhitelistTheopetraBondDepository', 1);

  const provider = new ethers.providers.InfuraProvider(
    chainId === 4 ? 'rinkeby' : 'homestead',
    'ed9edd44d7d64112a32daee9617e8eab' // TODO: env variable
  );
  const contract = new ethers.Contract(address, abi, provider);
  const result = await contract.calculatePrice({ args: id });
  console.log(result.toString());
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
  if (!id) return "";

  const output = (BigNumber.from(priceInfo).toNumber() / Math.pow(10, 9)).toFixed(5);

  return <>{token?.symbol === 'USDC' ? Number(output).toFixed(2) : output}</>;
};
