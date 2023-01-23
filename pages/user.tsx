import { NextPage } from "next";
import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import Profile from "../components/profile";

const User: NextPage = () => {
  return (
    <Layout title="나는">
      <section>
        <div className="h-56 bg-slate-100 flex flex-col justify-end p-4 gap-3 relative">
          <div className="absolute right-4 top-4 flex gap-2">
            <button className="border border-violet-400 bg-white px-2 py-1 text-sm rounded-md text-violet-400">
              친구 82
            </button>
            <button className="border border-violet-400 bg-white px-2 py-1 text-sm rounded-md text-violet-400">
              구독 12
            </button>
          </div>
          <Profile />
          <p className="text-xs text-slate-600">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
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
