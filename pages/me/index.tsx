import { gql, useQuery } from "@apollo/client";
import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { UserByAccountIdResponse } from "graphql/quries.type";
import type { User } from "hooks/useUser";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";

const GET_POSTS = gql`
  query GetPosts($count: Int!, $filter: filter) {
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
    }
  }
`;

interface Filter {
  userId?: string;
  category?: string;
  before?: string;
}

interface GetPostsForm {
  count: number;
  filter?: Filter;
}

interface GetPostsResponse {
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
  };
}

const Me = ({ user }: { user: User }) => {
  const { data, loading, refetch } = useQuery<GetPostsResponse, GetPostsForm>(
    GET_POSTS,
    {
      variables: { count: 20, filter: { userId: user._id } },
    }
  );
  return (
    <Layout title="나는" showNewPostBtn>
      <UserTemplate profile={user} isMe data={data} dataLoading={loading} />
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);
  try {
    const {
      data: { userByAccountId },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: accountId },
    });
    return addApolloState(apolloClient, {
      props: { user: userByAccountId },
    });
  } catch {
    return {
      props: {},
    };
  }
}

export default Me;
