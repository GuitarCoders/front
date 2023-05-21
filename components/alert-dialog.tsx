import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { NextPage } from "next";

interface AlertDialogComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
}

const AlertDialogComponent: NextPage<AlertDialogComponentProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
}) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow bg-black bg-opacity-20 fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
          <AlertDialog.Title className="font-semibold text-lg">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-4 mb-5 leading-normal">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end">
            <AlertDialog.Cancel asChild>
              <button className="text-gray-500 bg-gray-100 hover:bg-gray-200 h-10 items-center justify-center rounded-md px-4 font-medium outline-none">
                닫기
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertDialogComponent;
