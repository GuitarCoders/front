import Layout from "../components/layout";
import { PlusIcon } from "../styles/icons";

const New = () => {
  return (
    <Layout canGoBack>
      <section className="p-4">
        <form className="flex flex-col gap-3">
          <textarea
            className="border w-full resize-none rounded-md p-4 focus:ring-violet-400 focus:outline-violet-400"
            placeholder="무슨 일이 일어나고 있나요?"
            rows={3}
          />
          <div>
            <label
              htmlFor="media"
              className="w-14 h-14 border-2 border-dashed rounded-md text-gray-300 flex justify-center items-center hover:text-gray-700 hover:border-gray-700 hover:cursor-pointer"
            >
              <PlusIcon className="w-8 h-8" />
            </label>
            <input type="file" className="hidden" id="media" />
          </div>
          <button className="px-4 py-2 bg-violet-400 text-white rounded-md">
            글쓰기
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default New;
