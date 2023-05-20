import Layout from "../../components/layout";
import PostPreview from "../../components/post-preview";

const PostDetail = () => {
  const profile = {
    id: "my_nickname",
    name: "닉네임",
  };
  return (
    <Layout canGoBack profile={profile}>
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
        <div className="flex flex-col p-4 gap-2 text-sm">
          <h5 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            omnis culpa eos minus voluptatem, tempora beatae nemo, ab
            consequatur rem neque quidem recusandae cum sit eligendi voluptate
            praesentium? Dicta tempora sunt minus sit natus! Eveniet maiores
            debitis eaque doloremque eius.
          </h5>
          <p className="text-gray-600 font-light">
            Lorem ipsum dolor sit amet.
          </p>
          <div className="flex justify-between pt-6 items-center">
            <div>
              <p className="text-xs text-gray-600 font-light">
                {new Date().toLocaleString("ko", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-violet-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <p>3</p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <p>3</p>
              </div>
            </div>
          </div>
        </div>

        {/* <PostPreview /> */}
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
