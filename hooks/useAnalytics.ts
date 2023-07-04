import { logEvent } from '@/lib/analytics';
import { useAccount, usePublicClient } from 'wagmi';
import { getAccount } from '@wagmi/core';

type LogEventHookData = {
  name: string;
  data?: object;
};

export function useAnalytics() {
  const account = getAccount();
  const wallet = account?.address;
  const provider = usePublicClient();

  return {
    // auto-attach the wallet and other state
    logEvent: (params: LogEventHookData) => {
      const { name, data } = params;
      const merged = { ...data, chain_id: provider?.chain.id };
      logEvent({ userId: wallet, name, data: merged });
    },
  };
}
