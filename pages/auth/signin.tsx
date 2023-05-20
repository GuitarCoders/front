import ExternalLoginButton from "@components/external-login-button";
import SubmitButton from "@components/submit-button";
import { useLazyQuery, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";

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

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();

  const [getLogin, { loading, error, data }] =
    useLazyQuery<LoginResponse>(GET_LOGIN);
  const onValid = async (formData: LoginForm) => {
    if (loading) return;
    await getLogin({ variables: formData });
  };

  // 로그인 페이지에 진입 했을 때, token이 이미 있어도 삭제 시킴.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  }, [router]);

  // 로그인 시도 성공 시, 토큰 저장 시켜서 메인 페이지로 보냄
  useEffect(() => {
    if (data && data.login.status) {
      const token = data.login.jwt_token;
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [data, router]);

  if (error) alert(JSON.stringify(error));
  return (
    <main className="max-w-2xl mx-auto">
      <section className="flex p-8 my-10">
        <h1 className="text-4xl font-bold leading-snug">
          <b className="text-violet-600">나</b>도
          <br />
          <b className="text-violet-600">하</b>루
        </h1>
      </section>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col gap-4 p-8"
      >
        <input
          type="text"
          placeholder="유저명"
          autoComplete="off"
          autoSave="off"
          disabled={loading}
          className="appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 px-4 py-2"
          {...register("username")}
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="off"
          autoSave="off"
          disabled={loading}
          className="appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 px-4 py-2"
          {...register("password")}
        />
        <SubmitButton text="로그인" loading={loading} />
      </form>
      <div className="px-8 pb-8 flex justify-center">
        <p className="text-sm text-gray-500">
          아직 나도하루 계정이 없나요?{" "}
          <span className="underline text-violet-600">회원가입 하기</span>
        </p>
      </div>
      <div className="flex gap-8 pt-8 justify-center">
        <ExternalLoginButton icon="apple" />
        <ExternalLoginButton icon="kakao" />
        <ExternalLoginButton icon="github" />
      </div>
    </main>
  );
};

export default SignIn;
