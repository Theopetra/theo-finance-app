import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppProviders from '@/state/app/AppProviders';
import AppContainer from '@/components/AppContainer';
import { FC } from 'react';

const AppWrapper = (props: JSX.IntrinsicAttributes & CustomAppProps) => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);
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
  return (
    <AppContainer Header={PageHead} PageStateProvider={PageStateProvider}>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default AppWrapper;
