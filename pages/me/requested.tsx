import FriendRequested from "@components/friend-requested";
import Layout from "@components/layout";

const Requested = () => {
  return (
    <Layout canGoBack title="받은 친구 신청">
      <section className="flex flex-col divide-y">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <FriendRequested
            key={i}
            name="테스트맨"
            accountId="tester"
            message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              laudantium porro laborum exercitationem eaque sunt tempora
              suscipit quo a, nesciunt numquam alias eveniet molestiae, sint
              magni blanditiis id? Reprehenderit maiores eveniet magnam sapiente
              ad sunt eligendi consectetur fugit dolore corporis?"
          />
        ))}
      </section>
    </Layout>
  );
};

export default Requested;
