import { useRouter } from "next/router";
import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import PullToRefresh from "@components/pull-to-refresh";

interface TimelineProps {
  accountId?: string;
}

export default function Timeline({ accountId }: TimelineProps) {
  const { push } = useRouter();
  const pushToNewPage = () => push("/new");
  const refetch = () => console.log("refreshing...");

  return (
    <Layout title="모아보는" showNewPostBtn>
      <PullToRefresh onRefresh={refetch}>
        <section className="divide-y">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <PostPreview key={i} />
          ))}
        </section>
      </PullToRefresh>
    </Layout>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId } = cookies(ctx);
  return {
    props: { accountId },
  };
}
