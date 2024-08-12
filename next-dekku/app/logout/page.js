"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "../components/AuthContext";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { setIsLoggedIn, setLoginUser } = useLogin();

  useEffect(() => {
    const fetchLogout = async () => {
      try {
        const response = await fetch("https://dekku.co.kr/logout", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          alert("성공적으로 로그아웃 되었습니다.");
          window.localStorage.removeItem("access");
          window.localStorage.removeItem("name");

          setIsLoggedIn(false);
          setLoginUser(null);
          router.push("/", { replace: true });
        } else {
          alert("로그아웃에 실패하였습니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchLogout();
  }, []); // 빈 배열로 설정하여, 컴포넌트가 마운트될 때만 실행
};

export default Logout;
