import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import { gql, useQuery } from "@apollo/client";
import { User } from "hooks/useUser";
import SkPostPreview from "@components/skeletons/sk-post-preview";
import EmptyStateFooter from "@components/empty-state-has-footer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import useAlert from "hooks/useAlert";

const GET_POSTS = gql`
  query GetPosts($count: Int!, $filter: getPostFilter) {
    getPosts(getPostsData: { count: $count, filter: $filter }) {
      posts {
        _id
        author {
          _id
          name
        }
        content
        tags
        category
        createdAt
      }
      lastDateTime
      hasNext
    }
  }
`;

interface Filter {
  userId?: string;
  category?: string;
  before?: string;
}

interface GetPostsForm {
  count: number;
  filter?: Filter;
}

interface GetPostsResponse {
  getPosts: {
    posts: {
      _id: string;
      author: User;
      content: string;
      tags: string;
      category: string;
      createdAt: string;
    }[];
    lastDateTime: string;
    hasNext: boolean;
  };
}

export default function Timeline() {
  function fetchNext() {
    fetchMore({
      variables: {
        filter: { before: data?.getPosts.lastDateTime },
      },
    });
  }

  const alert = useAlert();
  const { data, loading, fetchMore, refetch, error } = useQuery<
    GetPostsResponse,
    GetPostsForm
  >(GET_POSTS, {
    variables: { count: 5, filter: undefined },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      alert({ visible: true, title: error.name, description: error.message });
    }
  }, [error, alert]);

  console.log(data);

  return (
    <Layout title="모아보는" showNewPostBtn>
      <button
        onClick={() => refetch()}
        className="border flex mx-auto p-2 rounded-lg text-gray-400"
      >
        ⬆ 임시 새 글 불러오기 버튼 ⬆
      </button>
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
