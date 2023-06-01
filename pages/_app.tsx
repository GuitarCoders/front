import "@styles/globals.css";
import React, { createContext } from "react";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AlertDialogComponent from "@components/alert-dialog";
import { RecoilRoot, useRecoilValue } from "recoil";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <AlertDialogComponent />
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  );
}
