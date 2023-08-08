import { ApolloError, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import useAlert from "./useAlert";
import { User, UserByAccountIdResponse } from "graphql/quries.type";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";

export type UserState = User | null | undefined;
type UseUserReturn = [UserState, { loading: boolean; error?: ApolloError }];

export default function useUser(accountId?: string): UseUserReturn {
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
    if (!accountId) {
      alert({
        visible: true,
        title: "로그인 알림",
        description: "서비스를 이용하려면 로그인이 필요해요.",
        relogin: true,
      });
      setUser(undefined);
    } else {
      (async () => {
        const user = await getUser(accountId);
        setUser(user);
      })();
    }
  }, [alert, getUser, accountId]);

  return [user, { loading, error }];
}
