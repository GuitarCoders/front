import Layout from "@components/layout";
import PostPreview from "@components/post-preview";
import PullToRefresh from "@components/pull-to-refresh";
import { gql, useQuery } from "@apollo/client";
import { User } from "hooks/useUser";
import SkPostPreview from "@components/skeletons/sk-post-preview";
import EmptyStateFooter from "@components/empty-state-has-footer";

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
  const { data, loading, refetch } = useQuery<GetPostsResponse, GetPostsForm>(
    GET_POSTS,
    {
      variables: { count: 20, filter: undefined },
    }
  );
  return (
    <Layout title="모아보는" showNewPostBtn>
      {!loading ? (
        <PullToRefresh onRefresh={refetch}>
          <section>
            {data?.getPosts.posts.map((post) => (
              <PostPreview
                key={post._id}
                author={post.author}
                content={post.content}
                tags={post.tags}
                createdAt={post.createdAt}
              />
            ))}
          </section>
        </PullToRefresh>
      ) : (
        Array.from({ length: 3 }, (_, i) => i).map((i) => (
          <SkPostPreview key={i} />
        ))
      )}
      {data === undefined ? (
        <EmptyStateFooter text="타임라인이 텅 비었어요" />
      ) : null}
    </Layout>
  );
}
