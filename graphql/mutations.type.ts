import { User } from "./quries.type";

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
