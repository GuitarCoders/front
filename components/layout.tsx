import { NextPage } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return <main className="max-w-2xl mx-auto">{children}</main>;
};

export default Layout;
