import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  AtSymbolIcon,
  RectangleStackIcon,
  UserIcon,
  UsersIcon,
} from "../styles/icons";
import { cls } from "../utils/cls";
import FooterItem from "./footer-item";

interface LayoutProps {
  title?: string;
  canGoBack?: true;
  children: ReactNode | ReactNode[];
}

const Layout: NextPage<LayoutProps> = ({ title, canGoBack, children }) => {
  const { back } = useRouter();
  return (
    <main className="max-w-2xl mx-auto">
      <header className="px-4 h-16 border-b text-center shadow-sm fixed flex items-center top-0 max-w-2xl w-full bg-white z-10">
        {canGoBack ? (
          <button className="text-2xl" onClick={back}>
            ←
          </button>
        ) : null}
        {title ? <h1 className="mx-auto text-lg font-bold">{title}</h1> : null}
      </header>
      <section className={cls("mt-16", canGoBack ? "" : "mb-20")}>
        {children}
      </section>
      {canGoBack ? null : (
        <footer className="max-w-2xl w-full grid grid-cols-4 mx-auto h-20 bg-white fixed bottom-0 border-t">
          <FooterItem title="모아보는" link="/" />
          <FooterItem title="멘션" link="/mention" />
          <FooterItem title="나는" link="/user" />
          <FooterItem title="친구들은" link="/friends" />
        </footer>
      )}
    </main>
  );
};

export default Layout;
