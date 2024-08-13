"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "../components/AuthContext";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { setIsLoggedIn, setLoginUser } = useLogin();

  const deleteCookie = (name) => {
    document.cookie = name + "=; Max-Age=0; path=/";
  };

  useEffect(() => {
    const fetchLogout = () => {
      setIsLoggedIn(false);
      setLoginUser(null);
      window.localStorage.removeItem("access");
      window.localStorage.removeItem("name");
      deleteCookie("refresh");
      router.push("/");
      return;
    };

    fetchLogout();
  }, []);
};

export default Logout;
