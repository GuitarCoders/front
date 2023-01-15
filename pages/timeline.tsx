import FIB from "../components/fib";
import Layout from "../components/layout";
import PostPreview from "../components/postPreview";
import { PlusIcon } from "../styles/icons";

export default function Timeline() {
  return (
    <Layout title="모아보는">
      {/* <div className="p-4 my-8 space-y-8">
        <PostForm />
      </div> */}
      <section className="divide-y">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <PostPreview key={i} />
        ))}
      </section>
      <FIB icon={<PlusIcon className="w-8 h-8" />} />
    </Layout>
  );
}
