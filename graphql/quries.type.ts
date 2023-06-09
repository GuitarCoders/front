import { User } from "hooks/useUser";

export interface UserByAccountIdResponse {
  userByAccountId: {
    __typename: "User";
  } & User;
}
