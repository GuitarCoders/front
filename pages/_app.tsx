import "@styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import AlertDialogComponent from "@components/alert-dialog";
import { RecoilRoot } from "recoil";
import { useApollo } from "@libs/apollo-client";
import { CookiesProvider, useCookies } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(["accessToken"]);
  const apolloClient = useApollo(pageProps, cookies.accessToken);
  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <AlertDialogComponent />
          <Component {...pageProps} />
        </RecoilRoot>
      </ApolloProvider>
    </CookiesProvider>
  );
}
