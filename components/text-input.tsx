import { NextPage } from "next";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  type?: "text" | "email" | "password";
  placeholder: string;
  loading?: boolean;
  register: UseFormRegisterReturn;
}

const TextInput: NextPage<TextInputProps> = ({
  type = "text",
  placeholder,
  loading,
  register,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      autoSave="off"
      disabled={loading}
      className="appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 px-4 py-2"
      {...register}
    />
  );
};

export default TextInput;
