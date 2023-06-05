import Layout from "@components/layout";
import UserTemplate from "@components/user-template";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";

const User = () => {
  const {
    query: { userId },
  } = useRouter();
  const [profile, { loading }] = useUser(userId + "");
  console.log(profile);
  return (
    <Layout title="나는">
      <UserTemplate profile={profile} loading={loading} />
    </Layout>
  );
};

export default User;
