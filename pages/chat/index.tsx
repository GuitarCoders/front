import Layout from "@components/layout";
import useUser from "hooks/useUser";
import { GetServerSidePropsContext, NextPage } from "next";
import cookies from "next-cookies";
import Link from "next/link";

interface ChatProps {
  accountId?: string;
}

const Chat: NextPage<ChatProps> = ({ accountId }) => {
  return (
    <Layout title="메시지" showNewChatBtn>
      <section>
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <Link href={`/chat/${i}`} key={i}>
            <div className="flex items-center border-b p-4 gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-md shrink-0" />
              <div className="flex flex-col gap-1 text-sm">
                <h5 className="font-semibold">닉네임</h5>
                <p className="font-light text-xs">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat, quasi!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accountId } = cookies(ctx);
  return {
    props: { accountId },
  };
}

export default Chat;
