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
