import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";

const Redirect = () => {
  const router = useRouter();
  const alert = useAlert();
  const [cookies] = useCookies(["accessToken"]);

  const alertAuth = useCallback(() => {
    alert({
      visible: true,
      title: "로그인 권한 없음",
      description:
        "죄송해요 로그인 권한을 확인하지 못했어요. 지속해서 문제가 발생하는 경우 운영자에게 문의해주세요.",
      relogin: true,
    });
  }, [alert]);

  useEffect(() => {
    if (cookies.accessToken) {
      router.push("/");
    } else {
      alertAuth();
    }
  }, [router, cookies, alertAuth]);

  return (
    <main>
      <h1>리다이렉트 중...</h1>
      <p>로그인 권한이 있는지 확인 중이에요!</p>
    </main>
  );
};

export default Redirect;
