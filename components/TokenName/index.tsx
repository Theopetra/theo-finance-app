import { useToken } from 'wagmi';

export const TokenInfo = (quoteToken: `0x${string}`) => {
  const { data: token } = useToken({ address: quoteToken });

  return token;
};
