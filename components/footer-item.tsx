import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { cls } from "../utils/cls";

interface FooterItemProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const FooterItem = ({ title, icon, link }: FooterItemProps) => {
  const { pathname } = useRouter();
  const active = pathname.split("/")[1] === link;
  return (
    <Link
      href={`/${link}`}
      className={cls(
        "flex flex-col justify-center items-center gap-1",
        active ? "text-violet-400 font-semibold" : ""
      )}
    >
      {icon}
      <p className={"text-sm"}>{title}</p>
    </Link>
  );
};

export default FooterItem;
