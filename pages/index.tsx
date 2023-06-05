import { useRouter } from "next/router";
import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import useUser from "hooks/useUser";

export default function Timeline() {
  const [user] = useUser();
  const { push } = useRouter();
  const pushToNewPage = () => push("/new");

  return (
    <Layout title="모아보는" showNewPostBtn>
      {!user ? null : (
        <section className="divide-y">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <PostPreview key={i} />
          ))}
        </section>
      )}
    </Layout>
  );
}
