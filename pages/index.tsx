import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import { gql, useQuery } from "@apollo/client";
import { User } from "hooks/useUser";
import SkPostPreview from "@components/skeletons/sk-post-preview";
import EmptyStateFooter from "@components/empty-state-has-footer";
import InfiniteScroll from "react-infinite-scroll-component";

const GET_POSTS = gql`
  query GetPosts($count: Int!, $filter: filter) {
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

  const { data, loading, fetchMore } = useQuery<GetPostsResponse, GetPostsForm>(
    GET_POSTS,
    {
      variables: { count: 5, filter: undefined },
    }
  );

  return (
    <Layout title="모아보는" showNewPostBtn>
      {!loading ? (
        <InfiniteScroll
          dataLength={data?.getPosts.posts.length ?? 20}
          next={fetchNext}
          loader={<SkPostPreview />}
          hasMore={true}
        >
          <section>
            {data?.getPosts.posts?.map((post) => (
              <PostPreview
                key={post._id}
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
