import { NextPage } from "next";
import { UseFormRegisterReturn } from "react-hook-form";

interface ChatInputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const ChatInput: NextPage<ChatInputProps> = ({ placeholder, register }) => {
  return (
    <div className="fixed bottom-0 p-4 w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full border pl-4 pr-14 py-2 rounded-3xl focus:ring-2 ring-violet-400 focus:outline-none"
          placeholder={placeholder}
          {...register}
        />
        <button className="absolute right-2 top-[5px] text-md py-1 px-4 bg-violet-400 rounded-3xl text-white">
          →
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
