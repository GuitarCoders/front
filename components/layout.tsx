import { NextPage } from "next";
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
  hideLayouts?: true;
  children: ReactNode | ReactNode[];
}

const Layout: NextPage<LayoutProps> = ({ title, hideLayouts, children }) => {
  return (
    <main className="max-w-2xl mx-auto">
      {hideLayouts ? null : (
        <header className="h-16 border-b text-center shadow-sm flex justify-center items-center fixed top-0 max-w-2xl w-full bg-white z-10">
          <h1 className="text-lg font-bold">{title}</h1>
        </header>
      )}
      <section className={hideLayouts ? "" : "mt-16 mb-20"}>{children}</section>
      {hideLayouts ? null : (
        <footer className="max-w-2xl w-full grid grid-cols-4 mx-auto h-20 bg-white fixed bottom-0 border-t">
          <FooterItem
            title="모아보는"
            link="timeline"
            icon={<RectangleStackIcon />}
          />
          <FooterItem title="멘션" link="mention" icon={<AtSymbolIcon />} />
          <FooterItem title="나는" link="user" icon={<UserIcon />} />
          <FooterItem title="친구들은" link="friends" icon={<UsersIcon />} />
        </footer>
      )}
    </main>
  );
};

export default Layout;
