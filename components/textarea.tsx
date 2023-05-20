import { NextPage } from "next";

interface TextareaProps {
  placeholder: string;
}

const Textarea: NextPage<TextareaProps> = ({ placeholder }) => {
  return (
    <textarea
      className="border w-full resize-none rounded-md p-4 focus:ring-2 focus:ring-violet-600 outline-none"
      placeholder={placeholder}
      rows={3}
    />
  );
};

export default Textarea;
