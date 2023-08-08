export interface User {
  _id: string;
  name: string;
  email: string;
  account_id: string;
  about_me: string;
  friends: string[];
}

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
