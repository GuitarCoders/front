import { atom } from "recoil";
import { v1 } from "uuid";

interface AlertAtomState {
  visible: boolean;
  title: string;
  description: string;
  closeBtn?: boolean;
  closeBtnAction?: (() => void) | null;
  extraBtnText?: string;
  extraBtnAction?: (() => void) | null;
  extraBtnColor?: "gray" | "red" | "green";
  extraBtnLoading?: boolean;
  relogin?: boolean;
}
export const alertAtom = atom<AlertAtomState>({
  key: `alertDialog/${v1()}`,
  default: {
    visible: false,
    title: "",
    description: "",
  },
});
