import { NextPage } from "next";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
  placeholder: string;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
}

const Textarea: NextPage<TextareaProps> = ({
  placeholder,
  register,
  defaultValue,
}) => {
  return (
    <textarea
      className="border w-full resize-none border-gray-300 shadow-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 outline-none"
      {...register}
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={3}
    />
  );
};

export default Textarea;
