import type { AppProps } from "next/app";
import "gestalt/dist/gestalt.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
