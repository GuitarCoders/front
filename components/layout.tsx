import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { cls } from "@libs/cls";
import FooterItem from "@components/footer-item";
import Link from "next/link";
import Head from "next/head";
import { User } from "hooks/useUser";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  profile?: User;
  children: ReactNode | ReactNode[];
  showNewPostBtn?: boolean;
  showNewChatBtn?: boolean;
}

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  profile,
  children,
  showNewPostBtn,
  showNewChatBtn,
}) => {
  const { back } = useRouter();

  return (
    <>
      <Head>
        <title>{title ? `${title} | 나도하루` : "나도하루"}</title>
      </Head>
      <main className="max-w-2xl mx-auto">
        <header className="px-4 h-14 border-b-2 border-violet-600 text-center fixed flex justify-between top-0 max-w-2xl w-full bg-white z-10 shadow-md">
          <section className="flex items-center gap-4">
            {canGoBack ? (
              <button className="text-2xl" onClick={back}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            ) : null}
            {!profile && title ? (
              <h1 className="text-lg font-bold text-violet-600">{title}</h1>
            ) : null}
            {profile ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-md" />
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold text-sm">{profile.name}</h3>
                  <p className="text-gray-400 text-xs">@{profile.account_id}</p>
                </div>
              </div>
            ) : null}
          </section>
          <section className="flex items-center gap-5">
            {showNewChatBtn ? (
              <Link href="/chat/new" className="text-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Link>
            ) : null}
            {showNewPostBtn ? (
              <Link href="/posts/new" className="text-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </Link>
            ) : null}
          </section>
        </header>
        <section className={cls("mt-14", canGoBack ? "" : "mb-20")}>
          {children}
        </section>
        {canGoBack ? null : (
          <footer className="max-w-2xl w-full grid grid-cols-4 mx-auto h-20 bg-violet-600 fixed bottom-0 border-t-2 border-violet-800">
            <FooterItem title="모아보는" link="/" />
            <FooterItem title="메시지" link="/chat" />
            <FooterItem title="나는" link="/me" />
            <FooterItem title="친구들은" link="/friends" />
          </footer>
        )}
      </main>
    </>
  );
};

export default Layout;
