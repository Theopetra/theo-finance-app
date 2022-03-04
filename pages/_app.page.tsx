import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProviders from "@/state/app/AppProviders";

const AppWrapper = (props) => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default AppWrapper;
