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

interface GetPostsFilter {
  userId?: string;
  category?: string;
  before?: string;
}

export interface GetPostsForm {
  count: number;
  filter?: GetPostsFilter;
}

export interface GetPostsResponse {
  getPosts: {
    posts: {
      _id: string;
      author: User;
      content: string;
      tags: string;
      category: string;
      createdAt: string;
    }[];
    lastDateTime: string;
    hasNext: boolean;
  };
}
