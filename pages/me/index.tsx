import { NextPage } from "next";
import Layout from "@components/layout";
import UserTemplate from "@components/user-template";

const Me: NextPage = () => {
  return (
    <Layout title="나는" showNewPostBtn>
      <UserTemplate isMe />
    </Layout>
  );
};

export default Me;
