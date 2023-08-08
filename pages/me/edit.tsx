import { gql, useMutation } from "@apollo/client";
import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import Textarea from "@components/textarea";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { User, UserByAccountIdResponse } from "graphql/quries.type";
import useAlert from "hooks/useAlert";
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

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
const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser(deleteUserData: { deleteConfirm: true }) {
      deleteStatus
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

interface DeleteUserResponse {
  deleteUser: {
    deleteStatus: boolean;
  };
}

interface EditProfileProps {
  user: User;
}

const EditProfile: NextPage<EditProfileProps> = ({ user }) => {
  const router = useRouter();
  const alert = useAlert();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "accountId",
  ]);

  const { register, handleSubmit } = useForm<EditProfileForm>();
  const [editProfile, { loading: editLoading }] = useMutation<
    EditProfileResponse,
    EditProfileForm
  >(EDIT_PROFILE);
  const [deleteUser, { loading: deleteLoading }] =
    useMutation<DeleteUserResponse>(DELETE_USER);

  const goToLoginPage = () => {
    router.push("/login").then(() => router.reload());
  };
  const alertEditSuccess = () => {
    alert({
      visible: true,
      title: "수정 완료",
      description: "입력하신 정보로 회원 정보 수정이 완료되었습니다.",
      closeBtnAction: () => {
        router.push("/me");
      },
    });
  };
  const alertEditFailed = () => {
    alert({
      visible: true,
      title: "정보 수정 중 오류 발생",
      description:
        "회원님이 입력하신 정보를 반영하는 과정에서 오류가 발생했어요.",
    });
  };
  const alertDeleteSuccess = () => {
    alert({
      visible: true,
      title: "삭제 완료",
      description: "회원 정보가 안전하게 삭제되었습니다.",
      closeBtn: false,
      extraBtnText: "로그인 페이지로",
      extraBtnAction: goToLoginPage,
    });
  };
  const alertConfirmDelete = () => {
    alert({
      visible: true,
      title: "회원 탈퇴",
      description:
        "탈퇴하기 버튼을 누르면 고객님의 회원 정보는 모두 삭제되며 이는 되돌릴 수 없습니다. 정말로 탈퇴하시겠습니까?",
      extraBtnText: "삭제하기",
      extraBtnAction: deleteAccount,
      extraBtnColor: "red",
    });
  };
  const alertDeleteFailed = () => {
    alert({
      visible: true,
      title: "탈퇴 실패",
      description:
        "탈퇴 처리 중에 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  };
  const deleteAccount = async () => {
    if (deleteLoading) return;
    try {
      const result = await deleteUser();
      if (result.data?.deleteUser) {
        alertDeleteSuccess();
      } else {
        alertDeleteFailed();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const alertLogout = () => {
    alert({
      visible: true,
      title: "로그아웃",
      description:
        "현재 계정에서 로그아웃하고 로그인 페이지로 돌아갑니다. 계속할까요?",
      extraBtnText: "로그아웃",
      extraBtnAction: logout,
      extraBtnColor: "green",
    });
  };
  const logout = () => {
    removeCookie("accessToken");
    removeCookie("accountId");
    router.push("/login");
  };
  const onValid = async (formData: EditProfileForm) => {
    if (editLoading) return;
    try {
      const result = await editProfile({ variables: formData });
      if (result) {
        alertEditSuccess();
      }
    } catch (error) {
      console.error(error);
      alertEditFailed();
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
            defaultValue={user.name}
          />
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="변경할 비밀번호"
          />
          <Textarea
            register={register("about_me", { required: true })}
            placeholder="자기소개"
            defaultValue={user.about_me}
          />
          <SubmitButton text="변경하기" loading={editLoading} />
          <SubmitButton
            text="회원 탈퇴하기"
            type="button"
            onClick={alertConfirmDelete}
            color="red"
          />
          <SubmitButton
            text="로그아웃"
            type="button"
            onClick={alertLogout}
            color="gray"
          />
        </form>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId, accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);

  const {
    data: { userByAccountId },
  } = await apolloClient.query<UserByAccountIdResponse>({
    query: USER_BY_ACCOUNT_ID,
    variables: { account_id: accountId },
  });

  return addApolloState(apolloClient, {
    props: { user: userByAccountId },
  });
}

export default EditProfile;
