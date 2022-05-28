import { useToken } from 'wagmi';

export const TokenInfo = (quoteToken: string) => {
  const { data: token, isLoading, isError } = useToken({ address: quoteToken });

  return token;
};
