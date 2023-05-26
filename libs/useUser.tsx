import { useEffect, useState } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  account_id: string;
  about_me: string;
}
type UseUserResult = User | null;

export default function useUser(): UseUserResult {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser === null) {
      return;
    } else {
      setUser(JSON.parse(lsUser));
    }
  }, []);
  return user;
}
