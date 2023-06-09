import { useRouter } from "next/router";
import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import useUser from "hooks/useUser";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";

interface TimelineProps {
  accountId?: string;
}

export default function Timeline({ accountId }: TimelineProps) {
  const { push } = useRouter();
  const pushToNewPage = () => push("/new");

  return (
    <Layout title="모아보는" showNewPostBtn>
      <section className="divide-y">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <PostPreview key={i} />
        ))}
      </section>
    </Layout>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId } = cookies(ctx);
  return {
    props: { accountId },
  };
}
