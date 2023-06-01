import { cls } from "@libs/cls";
import { NextPage } from "next";

interface SubmitButtonProps {
  text: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  destructive?: boolean;
}

const SubmitButton: NextPage<SubmitButtonProps> = ({
  text,
  loading,
  type = "submit",
  onClick,
  destructive = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls(
        "px-4 py-2 text-white rounded-md outline-none focus:ring-2 ",
        destructive
          ? "bg-rose-600 focus:ring-rose-700"
          : "bg-violet-400 focus:ring-violet-600"
      )}
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
};

export default SubmitButton;
