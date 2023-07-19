import ChatBubble from "@components/chat-bubble";
import ChatInput from "@components/chat-input";
import Layout from "@components/layout";

const ChatDetail = () => {
  const profile = {
    name: "닉네임",
    id: "my_nickname",
  };
  return (
    <Layout canGoBack profile={profile} title="DM">
      <section className="px-4 py-6 flex flex-col gap-4">
        <ChatBubble message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ipsam." />
        <ChatBubble message="Lorem ipsum." reversed />
        <ChatBubble message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ipsam." />
      </section>
      <ChatInput placeholder="채팅 입력.." />
    </Layout>
  );
};

export default ChatDetail;
