import { useQuery } from "@apollo/client";
import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
import { GET_POSTS, USER_BY_ACCOUNT_ID } from "graphql/quries";
import {
  GetPostsForm,
  GetPostsResponse,
  User,
  UserByAccountIdResponse,
} from "graphql/quries.type";
import useAlert from "hooks/useAlert";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { useEffect } from "react";

const Me = ({ user }: { user: User }) => {
  function fetchNext() {
    fetchMore({
      variables: {
        filter: { before: data?.getPosts.lastDateTime },
      },
    });
  }

  const alert = useAlert();
  const { data, loading, error, fetchMore } = useQuery<
    GetPostsResponse,
    GetPostsForm
  >(GET_POSTS, {
    variables: { count: 20, targetUserId: user?._id },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      alert({ visible: true, title: error.name, description: error.message });
    }
  }, [error, alert]);

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
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default Me;
