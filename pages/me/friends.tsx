import Layout from "@components/layout";
import Link from "next/link";

const MyFriends = () => {
  return (
    <Layout canGoBack title="친구">
      <section className="p-4">
        <Link href="/me/requested">
          <div className="rounded-lg shadow-lg">
            <div className="p-4 flex justify-between">
              <h1 className="">받은 친구 신청</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div>
          </div>
        </Link>
      </section>
      <section className="divide-y">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <Link href="/users/tester" key={i} className="flex gap-4 px-4 py-2">
            <div className="w-14 h-14 bg-gray-200 rounded-md shrink-0" />
            <div className="flex flex-col justify-center">
              <h4 className="font-medium">테스트맨</h4>
              <h5 className="text-sm text-gray-500">@tester</h5>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default MyFriends;
