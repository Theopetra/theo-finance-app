import { useToken } from 'wagmi';

export const TokenName = ({ quoteToken }) => {
  const { data } = useToken({ address: quoteToken });

  return data;
};
