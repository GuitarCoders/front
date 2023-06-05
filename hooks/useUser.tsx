import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import useAlert from "./useAlert";

const USER_BY_ACCOUNT_ID = gql`
  query UserByAccountId($account_id: String!) {
    userByAccountId(account_id: $account_id) {
      _id
      name
      email
      account_id
      about_me
      friends
    }
  }
`;
export interface User {
  _id: string;
  name: string;
  email: string;
  account_id: string;
  about_me: string;
  friends: string[];
}
interface UserByAccountIdResponse {
  userByAccountId: {
    __typename: "User";
  } & User;
}
export type UserState = User | null | undefined;
type UseUserReturn = [UserState, { loading: boolean; error?: ApolloError }];

export default function useUser(requestedAccountId?: string): UseUserReturn {
  const [user, setUser] = useState<UserState>(null);
  const alert = useAlert();
  const [userByAccountId, { loading, error }] = useLazyQuery<
    UserByAccountIdResponse,
    { account_id: string }
  >(USER_BY_ACCOUNT_ID);

  const getUser = useCallback(
    async (account_id: string) => {
      const result = await userByAccountId({
        variables: { account_id },
      });
      return result.data?.userByAccountId;
    },
    [userByAccountId]
  );

  useEffect(() => {
    const userAccountId = localStorage.getItem("account_id");
    if (userAccountId === null) {
      alert({
        visible: true,
        title: "로그인 알림",
        description: "서비스를 이용하려면 로그인이 필요해요.",
        relogin: true,
      });
      setUser(undefined);
    } else {
      (async () => {
        const user = await getUser(requestedAccountId ?? userAccountId);
        setUser(user);
      })();
    }
  }, [alert, getUser, requestedAccountId]);

  return [user, { loading, error }];
}
