import ExternalLoginButton from "@components/external-login-button";
import SubmitButton from "@components/submit-button";
import { useLazyQuery, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TextInput from "@components/text-input";
import useAlertDialog from "@libs/useAlertDialog";

interface LoginForm {
  username: string;
  password: string;
}

const GET_LOGIN = gql`
  query GetLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      name
      email
      account_id
      about_me
      friends
      status
      jwt_token
    }
  }
`;

interface LoginResponse {
  login: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
    status: string;
    jwt_token: string;
  };
}

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();

  const [getLogin, { loading, error, data }] = useLazyQuery<
    LoginResponse,
    LoginForm
  >(GET_LOGIN);
  const onValid = async (formData: LoginForm) => {
    if (loading) return;
    const result = await getLogin({ variables: formData });
    if (result.error) {
      return openDialog();
    }
  };

  const [LoginFailure, { openDialog }] = useAlertDialog({
    title: "로그인 실패 😭",
    description: "일치하는 회원 정보를 찾지 못했어요.",
  });

  // 로그인 페이지에 진입 했을 때, token이 이미 있어도 삭제 시킴.
  useEffect(() => {
    localStorage.clear();
  }, []);

  // 로그인 시도 성공 시, 토큰 저장 시켜서 메인 페이지로 보냄
  useEffect(() => {
    if (data && data.login.status) {
      const token = data.login.jwt_token;
      const user = {
        _id: data.login._id,
        name: data.login.name,
        email: data.login.email,
        account_id: data.login.account_id,
        about_me: data.login.about_me,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    }
  }, [data, router]);

  return (
    <>
      <LoginFailure />
      <main className="max-w-2xl mx-auto">
        <section className="flex p-8 my-10">
          <h1 className="text-4xl font-bold leading-snug">
            <b className="text-violet-600">나</b>도
            <br />
            <b className="text-violet-600">하</b>루
            <br />
            로그인
          </h1>
        </section>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-4 p-8"
        >
          <TextInput
            register={register("username")}
            placeholder="아이디"
            loading={loading}
          />
          <TextInput
            type="password"
            register={register("password")}
            placeholder="비밀번호"
            loading={loading}
          />
          <SubmitButton text="로그인" loading={loading} />
        </form>
        <div className="px-8 pb-8 flex justify-center">
          <p className="text-sm text-gray-500">
            아직 나도하루 계정이 없나요?{" "}
            <Link href="/sign-up" className="underline text-violet-600">
              회원가입 하기
            </Link>
          </p>
        </div>
        <div className="flex gap-8 pt-8 justify-center">
          <ExternalLoginButton icon="apple" />
          <ExternalLoginButton icon="kakao" />
          <ExternalLoginButton icon="github" />
        </div>
      </main>
    </>
  );
};

export default Login;
