import { User } from "hooks/useUser";

export interface UserByAccountIdResponse {
  userByAccountId: {
    __typename: "User";
  } & User;
}

export interface GetPostResponse {
  getPost: {
    _id: string;
    content: string;
    tags: string;
    category: string;
    createdAt: string;
    author: User;
  };
}
