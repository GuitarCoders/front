import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $tags: String!, $category: String!) {
    createPost(
      createPostData: { content: $content, tags: $tags, category: $category }
    ) {
      success
    }
  }
`;
