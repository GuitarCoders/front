import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";

const User = () => {
  const {
    query: { userId },
  } = useRouter();
  const [profile, { loading }] = useUser(`${userId}`);
  return (
    <Layout canGoBack>
      <UserTemplate profile={profile} loading={loading} />
    </Layout>
  );
};

export default User;
