import { gql, useMutation, useQuery } from "@apollo/client";
import ChatInput from "@components/chat-input";
import Comment from "@components/comment";
import Layout from "@components/layout";
import SkComment from "@components/skeletons/sk-comment";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
import { GET_POST } from "graphql/quries";
import { GetPostResponse } from "graphql/quries.type";
import useAlert from "hooks/useAlert";
import { User } from "hooks/useUser";
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";

const GET_COMMENTS = gql`
  query GetComments($postId: String!, $filter: commentFilter!) {
    getCommentByPostId(postId: $postId, filter: $filter) {
      comments {
        _id
        content
        postId
        Commenter {
          _id
          name
        }
        createdAt
      }
      hasNext
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddCommentToPost($targetPostId: String!, $content: String!) {
    addCommentToPost(targetPostId: $targetPostId, content: $content) {
      _id
      content
      postId
      Commenter {
        _id
        name
      }
      createdAt
    }
  }
`;

interface Filter {
  skip?: number;
  limit: number;
}

interface GetCommentsForm {
  postId: string;
  filter: Filter;
}

interface AddCommentForm {
  targetPostId: string;
  content: string;
}

interface AddCommentResponse {
  addCommentToPost: {
    _id: string;
    content: string;
    postId: string;
    Commenter: User;
    createdAt: string;
  };
}

interface GetCommentsResponse {
  getCommentByPostId: {
    comments: {
      _id: string;
      content: string;
      postId: string;
      Commenter: User;
      createdAt: string;
    }[];
    hasNext: boolean;
  };
}

interface PostDetailProps {
  post: {
    _id: string;
    content: string;
    tags: string;
    category: string;
    createdAt: string;
    author: User;
  };
}

const PostDetail: NextPage<PostDetailProps> = ({ post }) => {
  const limit = 10;
  const [skip, setSkip] = useState(limit);
  const router = useRouter();
  const postId = String(router.query.postId);
  const { register, handleSubmit, setValue } = useForm<{ comment: string }>();
  const {
    data: commentsData,
    loading: commentsLoading,
    fetchMore: fetchMoreComments,
    client,
  } = useQuery<GetCommentsResponse, GetCommentsForm>(GET_COMMENTS, {
    variables: {
      postId,
      filter: { skip: 0, limit },
    },
  });

  const [addComment, { loading: addCommentLoading }] = useMutation<
    AddCommentResponse,
    AddCommentForm
  >(ADD_COMMENT);

  const alert = useAlert();
  const onValid = async (formData: { comment: string }) => {
    if (addCommentLoading) {
      return;
    }
    try {
      const result = await addComment({
        variables: { content: formData.comment, targetPostId: postId },
      });
      if (result) {
        setValue("comment", "");
        const data = await client.readQuery({
          query: GET_COMMENTS,
          variables: { postId },
        });
        console.log(data);
        client.writeQuery({
          query: GET_COMMENTS,
          variables: { postId },
          data: {
            getCommentByPostId: {
              ...data.getCommentByPostId,
              comments: [result.data?.addCommentToPost],
            },
          },
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        alert({
          visible: true,
          title: error?.name,
          description: error.message,
        });
      } else {
        alert({
          visible: true,
          title: "오류 발생",
          description: JSON.stringify(error),
        });
      }
    }
  };

  function fetchNext() {
    setSkip((prev) => prev + limit);
    fetchMoreComments({
      variables: {
        filter: { skip, limit },
      },
    });
  }

  return (
    <Layout canGoBack profile={post.author}>
      <section className="divide-y pb-16">
        {/* 본문 */}
        <div className="flex flex-col p-4 gap-2 text-sm shadow-md">
          <h5>{post.content}</h5>
          <p className="text-gray-600 font-light">{post.tags}</p>
          <div className="flex justify-between pt-6 items-center">
            <div>
              <p className="text-xs text-gray-600 font-light">
                {new Date(post.createdAt).toLocaleString("ko", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
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
                <p>0</p>
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
                <p>{commentsData?.getCommentByPostId.comments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 나도 */}
        <div>
          <div className="flex gap-4 px-4 h-16 items-center border-b">
            <button className="flex items-center gap-1 border shadow-sm rounded-md px-3 py-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              나도
            </button>
            <p className="text-sm text-gray-400">이 글에 공감한다면 나도!</p>
          </div>

          {/* 댓글 */}
          {commentsLoading ? (
            Array.from({ length: 10 }, (_, i) => <SkComment key={i} />)
          ) : (
            <InfiniteScroll
              dataLength={
                commentsData?.getCommentByPostId.comments.length ?? limit
              }
              next={fetchNext}
              hasMore={commentsData?.getCommentByPostId.hasNext!}
              loader={<SkComment />}
            >
              {commentsData?.getCommentByPostId.comments.map((comment) => (
                <Comment
                  username={comment.Commenter.name}
                  comment={comment.content}
                  key={comment._id}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </section>

      <form onSubmit={handleSubmit(onValid)}>
        <ChatInput
          placeholder="댓글 입력.."
          register={register("comment", { required: true })}
        />
      </form>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);
  const postId = ctx.params?.postId;
  try {
    const {
      data: { getPost },
    } = await apolloClient.query<GetPostResponse>({
      query: GET_POST,
      variables: { postId },
    });
    return addApolloState(apolloClient, {
      props: { post: getPost },
    });
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default PostDetail;
