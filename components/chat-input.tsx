import { NextPage } from "next";

interface ChatInputProps {
  placeholder?: string;
}

const ChatInput: NextPage<ChatInputProps> = ({ placeholder }) => {
  return (
    <div className="fixed bottom-0 p-4 w-full max-w-2xl mx-auto">
      <form className="relative">
        <input
          type="text"
          className="w-full border pl-4 pr-14 py-2 rounded-3xl focus:ring-2 ring-violet-400 focus:outline-none"
          placeholder={placeholder}
        />
        <button className="absolute right-2 top-[5px] text-md py-1 px-4 bg-violet-400 rounded-3xl text-white">
          →
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
