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
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

interface UserPageProps {
  profile: User | null;
  isMe: boolean;
}

const UserPage: NextPage<UserPageProps> = ({ isMe, profile }) => {
  const router = useRouter();
  useEffect(() => {
    if (!profile) {
      router.push("/404");
    }
  }, [profile, router]);

  const { data, loading, refetch } = useQuery<GetPostsResponse, GetPostsForm>(
    GET_POSTS,
    {
      variables: { count: 20, targetUserId: profile?._id },
    }
  );

  if (!profile) return null;
  return (
    <Layout canGoBack title={profile.name}>
      <UserTemplate
        profile={profile}
        isMe={isMe}
        data={data}
        dataLoading={loading}
      />
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const userAccountId = ctx.params?.userAccountId;
  const isMe = accountId === userAccountId;
  const apolloClient = initializeApollo(null, accessToken);

  try {
    const {
      data: { userByAccountId },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: userAccountId },
    });
    return addApolloState(apolloClient, {
      props: { profile: userByAccountId, isMe },
    });
  } catch {
    return {
      props: { profile: null },
    };
  }
}

export default UserPage;
