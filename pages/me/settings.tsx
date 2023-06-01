import { gql, useMutation } from "@apollo/client";
import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import Textarea from "@components/textarea";
import useAlert from "hooks/useAlert";
import useUser from "hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const EDIT_PROFILE = gql`
  mutation EditProfile($name: String!, $password: String!, $about_me: String!) {
    updateUser(
      updateUserData: { name: $name, password: $password, about_me: $about_me }
    ) {
      _id
      name
      email
      account_id
      about_me
      friends
      status
    }
  }
`;

interface EditProfileForm {
  name: string;
  password: string;
  about_me: string;
}

interface EditProfileResponse {
  updateUser: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
    status: string;
  };
}

const Settings: NextPage = () => {
  const { register, handleSubmit } = useForm<EditProfileForm>();
  const router = useRouter();
  const [editProfile, { loading }] = useMutation<
    EditProfileResponse,
    EditProfileForm
  >(EDIT_PROFILE);
  const alert = useAlert();

  const user = useUser();
  const onValid = async (formData: EditProfileForm) => {
    if (loading) return;
    console.log("FD", formData);
    try {
      const result = await editProfile({ variables: formData });
      if (result) {
        alert({
          visible: true,
          title: "수정 완료",
          description: "입력하신 정보로 회원 정보 수정이 완료되었습니다.",
          closeBtnAction: () => {
            router.back();
          },
        });
      }
      console.log("result", result);
    } catch (error) {
      console.error(error);
      alert({
        visible: true,
        title: "정보 수정 중 오류 발생",
        description:
          "회원님이 입력하신 정보를 반영하는 과정에서 오류가 발생했어요.",
      });
    }
  };

  if (!user) return null;
  return (
    <>
      <Layout title="내 정보" canGoBack>
        <form
          onSubmit={handleSubmit(onValid)}
          className="p-4 pt-8 flex flex-col gap-3"
        >
          <TextInput
            register={register("name", { required: true })}
            placeholder="이름"
            defaultValue={user?.name}
          />
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="변경할 비밀번호"
          />
          <Textarea
            register={register("about_me", { required: true })}
            placeholder="자기소개"
            defaultValue={user?.about_me}
          />
          <SubmitButton text="변경하기" loading={loading} />
        </form>
      </Layout>
    </>
  );
};

export default Settings;
