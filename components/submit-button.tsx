import { NextPage } from "next";

interface SubmitButtonProps {
  text: string;
  loading?: boolean;
}

const SubmitButton: NextPage<SubmitButtonProps> = ({ text, loading }) => {
  return (
    <button className="px-4 py-2 bg-violet-400 text-white rounded-md outline-none focus:ring-2 focus:ring-violet-600">
      {loading ? "로딩 중..." : text}
    </button>
  );
};

export default SubmitButton;
