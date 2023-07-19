import { gql, useMutation } from "@apollo/client";
import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import Textarea from "@components/textarea";
import useAlert from "hooks/useAlert";
import { User } from "hooks/useUser";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const CREATE_POST = gql`
  mutation CreatePost($content: String!, $tags: String!, $category: String!) {
    createPost(
      createPostData: { content: $content, tags: $tags, category: $category }
    ) {
      success
    }
  }
`;

interface PostResponse {
  createPost: {
    _id: string;
    author: User;
    content: string;
    tags: string;
    category: string;
    createdAt: string;
    success: boolean;
  };
}

interface PostForm {
  content: string;
  tags: string;
  category: string;
}

const NewPost = () => {
  const alert = useAlert();
  const router = useRouter();
  const [post, { loading }] = useMutation<PostResponse, PostForm>(CREATE_POST);
  const { register, handleSubmit } = useForm<PostForm>();
  const onValid = async (form: PostForm) => {
    if (loading) return;
    const variables = { ...form, category: "" };
    try {
      const result = await post({ variables });
      if (result.errors) {
        showError();
      } else {
        router.back();
      }
    } catch {
      showError();
    }
  };
  const showError = () => {
    alert({
      visible: true,
      title: "글쓰기 오류",
      description:
        "새 글을 업로드하는 도중 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  };

  return (
    <Layout canGoBack title="새 글 업로드">
      <section className="p-4">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
          <Textarea
            register={register("content", { required: true })}
            placeholder="무슨 일이 일어나고 있나요?"
          />
          <TextInput register={register("tags")} placeholder="태그 작성.." />
          <div>
            <label
              htmlFor="media"
              className="w-14 h-14 border-2 border-dashed rounded-md text-gray-300 flex justify-center items-center hover:text-gray-700 hover:border-gray-700 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <input type="file" className="hidden" id="media" />
          </div>
          <SubmitButton loading={loading} text="글쓰기" />
        </form>
      </section>
    </Layout>
  );
};

export default NewPost;
