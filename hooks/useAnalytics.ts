import { logEvent } from '@/lib/analytics';
import { useAccount, useConnect, useProvider } from 'wagmi';

type LogEventHookData = {
  name: string;
  data?: object;
};

export function useAnalytics() {
  const { data: accountData } = useAccount();
  const wallet = accountData?.address;
  const provider = useProvider();

  return {
    // auto-attach the wallet and other state
    logEvent: (params: LogEventHookData) => {
      const { name, data } = params;
      const merged = { ...data, chain_id: provider.network.chainId };
      logEvent({ userId: wallet, name, data: merged });
    },
  };
}
