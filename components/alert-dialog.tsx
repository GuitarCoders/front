import { alertAtom } from "@libs/atoms";
import { cls } from "@libs/cls";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

const AlertDialogComponent = () => {
  const router = useRouter();
  const [
    {
      visible,
      title,
      description,
      closeBtn = true,
      closeBtnAction,
      extraBtnText,
      extraBtnAction,
      extraBtnColor,
      extraBtnLoading,
      relogin,
    },
    alert,
  ] = useRecoilState(alertAtom);

  const buttonColor = (color: "gray" | "red" | "green") => {
    switch (color) {
      case "gray":
        return "text-gray-500 bg-gray-100 hover:bg-gray-200";
      case "red":
        return "text-white bg-rose-600 hover:bg-rose-700-";
      case "green":
        return "text-white bg-green-500 hover:bg-green-600";
    }
  };

  const closeDialog = () => {
    alert({ visible: false, title: "", description: "" });
    if (closeBtnAction) {
      closeBtnAction();
    }
  };

  const onExtraBtnClick = () => {
    if (extraBtnAction) {
      extraBtnAction();
    }
    closeDialog();
  };

  const pushToLogin = () => {
    router.push("/login");
    closeDialog();
  };

  return (
    <AlertDialog.Root open={visible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow bg-black bg-opacity-20 fixed inset-0 z-30" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none z-40">
          <AlertDialog.Title className="font-semibold text-lg">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-4 mb-5 leading-normal">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            {extraBtnText ? (
              <AlertDialog.Action asChild>
                <button
                  onClick={onExtraBtnClick}
                  className={cls(
                    "h-10 items-center justify-center rounded-md px-4 font-medium outline-none",
                    extraBtnColor
                      ? buttonColor(extraBtnColor)
                      : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  {extraBtnLoading ? "로딩 중..." : extraBtnText}
                </button>
              </AlertDialog.Action>
            ) : null}
            {relogin ? (
              <AlertDialog.Action asChild>
                <button
                  disabled={extraBtnLoading}
                  onClick={pushToLogin}
                  className={cls(
                    "h-10 items-center justify-center rounded-md px-4 font-medium outline-none",
                    extraBtnColor
                      ? buttonColor(extraBtnColor)
                      : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  로그인 페이지로
                </button>
              </AlertDialog.Action>
            ) : null}
            {closeBtn ? (
              <AlertDialog.Cancel asChild>
                <button
                  disabled={extraBtnLoading}
                  onClick={closeDialog}
                  className="text-gray-500 bg-gray-100 hover:bg-gray-200 h-10 items-center justify-center rounded-md px-4 font-medium outline-none"
                >
                  닫기
                </button>
              </AlertDialog.Cancel>
            ) : null}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertDialogComponent;
