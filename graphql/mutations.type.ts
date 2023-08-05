import { User } from "hooks/useUser";

export interface CreatePostResponse {
  createPost: {
    _id: string;
    author: User;
    content: string;
    tags: string;
    category: string;
    createdAt: string;
    success: boolean;
  };
}

export interface CreatePostForm {
  content: string;
  tags: string;
  category: string;
}
