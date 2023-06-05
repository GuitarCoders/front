import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import { initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { UserByAccountIdResponse } from "graphql/quries.type";
import type { User } from "hooks/useUser";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";

const Me = ({ user }: { user: User }) => {
  return (
    <Layout title="나는">
      <UserTemplate profile={user} isMe />
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);

  const {
    data: { userByAccountId },
  } = await apolloClient.query<UserByAccountIdResponse>({
    query: USER_BY_ACCOUNT_ID,
    variables: { account_id: accountId },
  });

  return {
    props: { accountId, user: userByAccountId },
  };
}

export default Me;