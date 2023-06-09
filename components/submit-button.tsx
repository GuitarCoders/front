import { cls } from "@libs/cls";
import { NextPage } from "next";

interface SubmitButtonProps {
  text: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  color?: "violet" | "red" | "gray";
}

const SubmitButton: NextPage<SubmitButtonProps> = ({
  text,
  loading,
  type = "submit",
  onClick,
  color,
}) => {
  const buttonColor = (color: "violet" | "red" | "gray") => {
    switch (color) {
      case "violet":
        return "bg-violet-400 focus:ring-violet-600";
      case "red":
        return "bg-rose-600 focus:ring-rose-700";
      case "gray":
        return "bg-gray-200 focus:ring-gray-400 text-black";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls(
        "px-4 py-2 text-white rounded-md outline-none focus:ring-2 ",
        color ? buttonColor(color) : "bg-violet-400 focus:ring-violet-600"
      )}
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
};

export default SubmitButton;
