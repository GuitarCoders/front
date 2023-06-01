import { alertAtom } from "@libs/atoms";
import { useSetRecoilState } from "recoil";

export default function useAlert() {
  const alert = useSetRecoilState(alertAtom);
  return alert;
}
