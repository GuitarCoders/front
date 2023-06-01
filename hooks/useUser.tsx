import { useEffect, useState } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  account_id: string;
  about_me: string;
}
type UseUserResult = User | null | undefined;

export default function useUser(): UseUserResult {
  const [user, setUser] = useState<UseUserResult>(null);
  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser === null) {
      setUser(undefined);
    } else {
      setUser(JSON.parse(lsUser));
    }
  }, []);
  return user;
}
