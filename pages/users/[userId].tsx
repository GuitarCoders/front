import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import { initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { UserByAccountIdResponse } from "graphql/quries.type";
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import type { User } from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  if (!profile) return null;
  return (
    <Layout canGoBack title={profile.name}>
      <UserTemplate profile={profile} isMe={isMe} />
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const userId = ctx.params?.userId;
  const isMe = accountId === userId;
  const apolloClient = initializeApollo(null, accessToken);

  try {
    const {
      data: { userByAccountId },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: userId },
    });
    return {
      props: { profile: userByAccountId, isMe },
    };
  } catch {
    return {
      props: { profile: null },
    };
  }
}

export default UserPage;
