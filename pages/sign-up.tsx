import { gql, useMutation } from "@apollo/client";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $account_id: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      createUserData: {
        name: $name
        account_id: $account_id
        email: $email
        password: $password
      }
    ) {
      _id
      name
      email
      account_id
      about_me
      friends
    }
  }
`;

interface SignUpForm {
  name: string;
  account_id: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  createUser: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
  };
}

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpForm>();

  const [getSignUp, { loading, error }] = useMutation<
    SignUpResponse,
    SignUpForm
  >(SIGN_UP);

  const onValid = async (formData: SignUpForm) => {
    if (loading) return;
    console.log("FD", formData);
    const result = await getSignUp({ variables: formData });
    console.log(result);
  };

  // 로그인 페이지에 진입 했을 때, token이 이미 있어도 삭제 시킴.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  }, [router]);

  // 회원가입 성공 시, 토큰 저장 시켜서 메인 페이지로 보냄
  // useEffect(() => {
  //   if (data && data.createUser.status) {
  //     const token = data.status.jwt_token;
  //     localStorage.setItem("token", token);
  //     router.push("/");
  //   }
  // }, [data, router]);

  if (error) alert(JSON.stringify(error));
  return (
    <main className="max-w-2xl mx-auto">
      <section className="flex p-8 my-10">
        <h1 className="text-4xl font-bold leading-snug">
          <b className="text-violet-600">나</b>도
          <br />
          <b className="text-violet-600">하</b>루
          <br />
          회원가입
        </h1>
      </section>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col gap-4 p-8"
      >
        <TextInput
          register={register("account_id")}
          placeholder="아이디"
          loading={loading}
        />
        <TextInput
          type="password"
          register={register("password")}
          placeholder="비밀번호"
          loading={loading}
        />
        <TextInput
          register={register("name")}
          placeholder="이름 (닉네임)"
          loading={loading}
        />
        <TextInput
          register={register("email")}
          type="email"
          placeholder="이메일"
          loading={loading}
        />
        <SubmitButton text="회원가입" loading={loading} />
      </form>
      <div className="px-8 pb-8 flex justify-center">
        <p className="text-sm text-gray-500">
          이미 나도하루 계정을 만들었나요?{" "}
          <Link href="/login" className="underline text-violet-600">
            로그인 하기
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
