import { NextPage } from "next";
import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import Profile from "../components/profile";

const User: NextPage = () => {
  return (
    <Layout title="나는">
      <section>
        <div className="h-56 bg-slate-100 flex items-end p-4">
          <Profile />
        </div>
        <div className="grid grid-cols-4 h-12 border-b">
          <button className="text-violet-400 font-bold">이야기</button>
          {["미디어", "글감", "미투함"].map((i) => (
            <button key={i}>{i}</button>
          ))}
        </div>
        <div className="divide-y">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <PostPreview key={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default User;
