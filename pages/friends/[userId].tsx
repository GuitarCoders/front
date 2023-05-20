import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import Textarea from "@components/textarea";
import { useRouter } from "next/router";

const NewFriend = () => {
  const router = useRouter();
  return (
    <Layout title="친구 신청" canGoBack>
      <section className="flex flex-col p-4 gap-4">
        <Textarea
          placeholder={`@${router.query.userId}님께 친구신청 메시지를 보냅니다.`}
        />
        <SubmitButton text="친구신청 보내기" />
      </section>
    </Layout>
  );
};

export default NewFriend;
