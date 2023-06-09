import { gql, useMutation } from "@apollo/client";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import useAlert from "hooks/useAlert";
import Head from "next/head";
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
  const alert = useAlert();

  const [getSignUp, { loading }] = useMutation<SignUpResponse, SignUpForm>(
    SIGN_UP
  );

  const showError = () => {
    alert({
      visible: true,
      title: "회원가입 오류",
      description:
        "회원가입 도중 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  };

  const showSuccess = () => {
    alert({
      visible: true,
      title: "회원가입 완료",
      description:
        "입력한 정보로 회원가입이 완료되었어요. 이제 로그인 하러 갈까요?",
      closeBtn: false,
      relogin: true,
    });
  };

  const onValid = async (formData: SignUpForm) => {
    if (loading) return;
    const result = await getSignUp({ variables: formData });
    console.log("sign-up result", result);

    if (result.errors) {
      showError();
    } else {
      showSuccess();
    }
  };

  // 로그인 페이지에 진입 했을 때, token이 이미 있어도 삭제 시킴.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>회원가입 | 나도하루</title>
      </Head>
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
            register={register("account_id", { required: true })}
            placeholder="아이디"
            loading={loading}
          />
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="비밀번호"
            loading={loading}
          />
          <TextInput
            register={register("name", { required: true })}
            placeholder="이름 (닉네임)"
            loading={loading}
          />
          <TextInput
            register={register("email", { required: true })}
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
    </>
  );
};

export default SignUp;
