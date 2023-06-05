import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const USER_BY_ID = gql`
  query UserById($id: String!) {
    userById(id: $id) {
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
interface UserByIdResponse {
  userById: {
    __typename: "User";
  } & User;
}
export type UserState = User | null | undefined;
type UseUserReturn = [UserState, { loading: boolean; error?: ApolloError }];

export default function useUser(): UseUserReturn {
  const [user, setUser] = useState<UserState>(null);
  const [userById, { loading, error }] = useLazyQuery<
    UserByIdResponse,
    { id: string }
  >(USER_BY_ID);

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if (userId === null) {
      setUser(undefined);
    } else {
      (async () => {
        const result = await userById({ variables: { id: userId } });
        setUser(result.data?.userById);
      })();
    }
  }, [userById]);

  return [user, { loading, error }];
}
