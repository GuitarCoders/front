import Layout from "../components/layout";
import PostForm from "../components/postForm";
import PostPreview from "../components/postPreview";

export default function Home() {
  return (
    <Layout>
      <section className="py-2 mb-12">
        <PostForm />
      </section>
      <section className="space-y-4">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <PostPreview key={i} />
        ))}
      </section>
    </Layout>
  );
}
