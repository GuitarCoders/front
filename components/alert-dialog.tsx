import { alertAtom } from "@libs/atoms";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRecoilState } from "recoil";

const AlertDialogComponent = () => {
  const [
    {
      visible,
      title,
      description,
      closeBtn = true,
      closeBtnAction,
      extraBtnText,
      extraBtnAction,
    },
    alert,
  ] = useRecoilState(alertAtom);

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

  return (
    <AlertDialog.Root open={visible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow bg-black bg-opacity-20 fixed inset-0 z-10" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none z-20">
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
                  className="text-gray-500 bg-gray-100 hover:bg-gray-200 h-10 items-center justify-center rounded-md px-4 font-medium outline-none"
                >
                  {extraBtnText}
                </button>
              </AlertDialog.Action>
            ) : null}
            {closeBtn ? (
              <AlertDialog.Cancel asChild>
                <button
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
