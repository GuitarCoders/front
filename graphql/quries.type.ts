import { User } from "hooks/useUser";

export interface UserByAccountIdResponse {
  userByAccountId: {
    __typename: "User";
  } & User;
}

export interface Post {
  _id: string;
  content: string;
  tags: string;
  category: string;
  createdAt: string;
  author: User;
  commentsCount: number;
}

export interface GetPostResponse {
  getPost: Post;
}

interface GetPostsFilter {
  category?: string;
  before?: string;
}

export interface GetPostsForm {
  count: number;
  filter?: GetPostsFilter;
  targetUserId?: string;
}

export interface GetPostsResponse {
  getPosts: {
    posts: Post[];
    lastDateTime: string;
    hasNext: boolean;
  };
}
