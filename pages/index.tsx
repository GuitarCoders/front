import Layout from "../components/layout";
import PostForm from "../components/postForm";
import PostPreview from "../components/postPreview";

export default function Home() {
  return (
    <Layout title="모아보는">
      <section className="mt-8 space-y-8">
        <PostForm />
        <section className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <PostPreview key={i} />
          ))}
        </section>
      </section>
    </Layout>
  );
}
