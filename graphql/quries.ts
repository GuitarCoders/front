import { gql } from "@apollo/client";

export const USER_BY_ACCOUNT_ID = gql`
  query UserByAccountId($account_id: String!) {
    userByAccountId(account_id: $account_id) {
      _id
      name
      email
      account_id
      # friends
      about_me
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: String!) {
    getPost(postId: $postId) {
      _id
      author {
        _id
        name
        account_id
      }
      content
      tags
      category
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($count: Int!, $filter: getPostFilter) {
    getPosts(getPostsData: { count: $count, filter: $filter }) {
      posts {
        _id
        author {
          _id
          name
        }
        content
        tags
        category
        createdAt
      }
      lastDateTime
      hasNext
    }
  }
`;
