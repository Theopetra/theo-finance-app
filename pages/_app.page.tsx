import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import AppProviders from '@/state/app/AppProviders';
import AppContainer from '@/components/AppContainer';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';
import { setDeviceId, setWallet } from '@/lib/analytics';
import { useAccount, useNetwork } from 'wagmi';
import { useAnalytics } from '@/hooks/useAnalytics';

type AppComponentExtensions = {
  PageHead: FC;
  PageStateProvider: any;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & AppComponentExtensions;
}

const NoopComponent = (props) => <>{props.children}</>;

function App({ Component, pageProps }: CustomAppProps) {
  const { PageHead = NoopComponent, PageStateProvider = NoopComponent } = Component;
  const router = useRouter();
  const { data } = useAccount();
  const { logEvent } = useAnalytics();

  // log the device id ologEventn app load
  useEffect(() => {
    setDeviceId();
    logEvent({ name: 'app_loaded' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // log wallet connected
  useEffect(() => {
    const wallet = data?.address;
    if (wallet) {
      setWallet(wallet);
      logEvent({ name: 'wallet_connected' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.address]);

  // log page views
  useEffect(() => {
    const handleChange = (url: string) => {
      logEvent({
        name: 'page_view',
        data: {
          url,
        },
      });
    };

    router.events.on('routeChangeComplete', handleChange);

    return () => {
      router.events.off('routeChangeComplete', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AppContainer Header={PageHead} PageStateProvider={PageStateProvider}>
      <Component {...pageProps} />
    </AppContainer>
  );
}

const AppWrapper = (props: JSX.IntrinsicAttributes & CustomAppProps) => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);

export default AppWrapper;
