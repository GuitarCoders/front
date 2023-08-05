import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import { useQuery } from "@apollo/client";
import SkPostPreview from "@components/skeletons/sk-post-preview";
import EmptyStateFooter from "@components/empty-state-has-footer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import useAlert from "hooks/useAlert";
import { AnimatePresence, motion } from "framer-motion";
import { GetPostsForm, GetPostsResponse } from "graphql/quries.type";
import { GET_POSTS } from "graphql/quries";

export default function Timeline() {
  function fetchNext() {
    fetchMore({
      variables: {
        filter: { before: data?.getPosts.lastDateTime },
      },
    });
  }

  const alert = useAlert();
  const [showBtn, setShowBtn] = useState(false);
  const { data, loading, fetchMore, refetch, error } = useQuery<
    GetPostsResponse,
    GetPostsForm
  >(GET_POSTS, {
    variables: { count: 5, filter: undefined },
  });

  function onRefetchClick() {
    refetch();
    scrollTo(0, 0);
    setShowBtn(false);
  }

  useEffect(() => {
    function toggleBtn() {
      setShowBtn(true);
    }
    const timer = setTimeout(toggleBtn, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [showBtn]);

  useEffect(() => {
    if (error) {
      console.error(error);
      alert({ visible: true, title: error.name, description: error.message });
    }
  }, [error, alert]);

  return (
    <Layout title="모아보는" showNewPostBtn>
      <AnimatePresence>
        {showBtn ? (
          <motion.button
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            onClick={onRefetchClick}
            className="flex justify-center items-center mx-auto fixed top-20 left-0 right-0 w-12 h-12 rounded-full text-sm text-white bg-violet-400 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </motion.button>
        ) : null}
      </AnimatePresence>
      {!loading ? (
        <InfiniteScroll
          dataLength={data?.getPosts.posts.length ?? 20}
          next={fetchNext}
          loader={<SkPostPreview />}
          hasMore={data?.getPosts.hasNext!}
        >
          <section>
            {data?.getPosts.posts?.map((post) => (
              <PostPreview
                key={post._id}
                postId={post._id}
                author={post.author}
                content={post.content}
                tags={post.tags}
                createdAt={post.createdAt}
              />
            ))}
          </section>
        </InfiniteScroll>
      ) : (
        Array.from({ length: 3 }, (_, i) => i).map((i) => (
          <SkPostPreview key={i} />
        ))
      )}
      {!loading && !data ? (
        <EmptyStateFooter text="타임라인이 텅 비었어요" />
      ) : null}
    </Layout>
  );
}
