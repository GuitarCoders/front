import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { cls } from "../utils/cls";
import FooterItem from "./footer-item";

interface Profile {
  avatar?: string;
  name: string;
  id: string;
}

interface LayoutProps {
  title?: string;
  canGoBack?: true;
  profile?: Profile;
  children: ReactNode | ReactNode[];
}

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  profile,
  children,
}) => {
  const { back } = useRouter();
  return (
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
          {title ? (
            <h1 className="text-lg font-bold text-violet-600">{title}</h1>
          ) : null}
          {profile ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-md" />
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-sm">닉네임</h3>
                <p className="text-gray-400 text-xs">my_nickname</p>
              </div>
            </div>
          ) : null}
        </section>
        <section className="flex items-center gap-5">
          <button>
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
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
          </button>
          <button>
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
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </button>
          <button className="text-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          </button>
        </section>
      </header>
      <section className={cls("mt-14", canGoBack ? "" : "mb-20")}>
        {children}
      </section>
      {canGoBack ? null : (
        <footer className="max-w-2xl w-full grid grid-cols-4 mx-auto h-20 bg-violet-600 fixed bottom-0 border-t-2 border-violet-800">
          <FooterItem title="모아보는" link="/" />
          <FooterItem title="메시지" link="/chat" />
          <FooterItem title="나는" link="/user" />
          <FooterItem title="친구들은" link="/friends" />
        </footer>
      )}
    </main>
  );
};

export default Layout;
