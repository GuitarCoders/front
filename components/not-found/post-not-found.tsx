import Layout from "@components/layout";

const PostNotFound = () => {
  return (
    <Layout canGoBack>
      <section className="divide-y pb-16">
        <div className="flex flex-col py-8 gap-2 text-sm text-center">
          <h5>요청하신 글을 찾을 수 없습니다.</h5>
          <p className="text-gray-600 font-light">
            다른 페이지로 검색해보세요.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PostNotFound;
