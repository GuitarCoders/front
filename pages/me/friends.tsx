import Layout from "@components/layout";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { UserByAccountIdResponse } from "graphql/quries.type";
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import Link from "next/link";

const friendRequestRoutes = [
  { link: "/me/sent", title: "보낸 친구 신청" },
  { link: "/me/received", title: "받은 친구 신청" },
];

interface MyFriendsProps {
  friends: string[];
}

const MyFriends: NextPage<MyFriendsProps> = ({ friends }) => {
  return (
    <Layout canGoBack title="친구">
      <section className="p-4 mb-2 flex flex-col gap-4">
        {friendRequestRoutes.map((route) => (
          <Link href={route.link} key={route.link}>
            <div className="p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between">
                <h1>{route.title}</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <section className="divide-y pb-6">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <Link href="/users/tester" key={i} className="flex gap-4 px-4 py-2">
            <div className="w-14 h-14 bg-gray-200 rounded-md shrink-0" />
            <div className="flex flex-col justify-center">
              <h4 className="font-medium">테스트맨</h4>
              <h5 className="text-sm text-gray-500">@tester</h5>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);

  try {
    const {
      data: {
        userByAccountId: { friends },
      },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: accountId },
    });

    if (friends) {
      return addApolloState(apolloClient, {
        props: { friends },
      });
    } else {
      return {
        props: {},
      };
    }
  } catch {
    return {
      props: {},
    };
  }
}

export default MyFriends;
