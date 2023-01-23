import { useRouter } from "next/router";
import FIB from "../../components/fib";
import Layout from "../../components/layout";
import PostPreview from "../../components/post-preview";
import { PlusIcon } from "../../styles/icons";

export default function Timeline() {
  const { push } = useRouter();
  const pushToNewPage = () => push("/new");

  return (
    <Layout title="모아보는">
      <section className="divide-y">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <PostPreview key={i} />
        ))}
      </section>
      <FIB icon={<PlusIcon className="w-8 h-8" />} onClick={pushToNewPage} />
    </Layout>
  );
}
