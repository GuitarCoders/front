import Layout from "../../components/layout";
import PostPreview from "../../components/post-preview";

const PostDetail = () => {
  return (
    <Layout canGoBack>
      <div className="fixed bottom-0 p-4 w-full max-w-2xl mx-auto">
        <form className="relative">
          <input
            type="text"
            className="w-full border pl-4 pr-14 py-2 rounded-3xl focus:ring-2 ring-violet-400 focus:outline-none"
          />
          <button className="absolute right-2 top-[5px] text-md py-1 px-4 bg-violet-400 rounded-3xl text-white">
            →
          </button>
        </form>
      </div>
      <section className="divide-y pb-16">
        <PostPreview />
        <div>
          <h2 className="p-4 border-b font-semibold">댓글 (3)</h2>
          <div className="divide-y">
            <div className="p-4 flex gap-4 align-start">
              <div className="w-10 h-10 rounded-full bg-slate-400 flex-shrink-0" />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                beatae quos vero itaque enim dolores cupiditate et expedita hic,
                quaerat dolore ea. Tempora ducimus provident iure explicabo
                cumque ea iste, aliquid facilis ullam ipsam odio, nam, ad
                inventore. Sit, veniam cumque est veritatis quis, commodi
                recusandae iure nobis nostrum, fuga laborum odio modi eum
                expedita doloribus culpa. Velit, enim cum.
              </p>
            </div>
            <div className="p-4 flex gap-4 align-start">
              <div className="w-10 h-10 rounded-full bg-slate-400 flex-shrink-0" />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                sint.
              </p>
            </div>
            <div className="p-4 flex gap-4 align-start">
              <div className="w-10 h-10 rounded-full bg-slate-400 flex-shrink-0" />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti quae, neque molestiae voluptatibus vel iure sed ex
                animi non ut assumenda amet mollitia earum omnis totam commodi
                ducimus nisi fuga!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostDetail;
