import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProviders from "@/state/app/AppProviders";
import AppContainer from "@/components/AppContainer";
import { FC } from "react";

const AppWrapper = (props) => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);
type AppComponentExtensions = {
  PageHead: FC;
};

export interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & AppComponentExtensions;
}

function App({ Component, pageProps }: CustomAppProps) {
  const { PageHead } = Component;
  return (
    <AppContainer Header={PageHead}>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default AppWrapper;
