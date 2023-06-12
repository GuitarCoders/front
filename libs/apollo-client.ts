import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "universal-cookie";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const cookies = new Cookies();

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_URL,
});

const createAuthLink = (token?: string) => {
  const authToken = token ?? cookies.get("accessToken") ?? undefined;
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    };
  });
};

function createApolloClient(token?: string) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createAuthLink(token).concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  token?: string
) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
