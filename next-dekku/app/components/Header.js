"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLogin } from "./AuthContext";

const Header = () => {
  const [token, setToken] = useState(null);
  const { isLoggedIn, loginUser } = useLogin();
  
  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // 여기서 token을 로컬 스토리지에 저장하거나 상태 관리 라이브러리에 저장할 수 있습니다.
      localStorage.setItem("kakaoToken", tokenFromUrl);
    }
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white px-4 py-8">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" className="w-20" alt="Logo" />
          </Link>
        </div>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-8 text-lg">
            <li>
              <Link href="/threeD">3D Desk</Link>
            </li>
            <li>
              <Link href="/deskSetup">Desk Setup</Link>
            </li>
            <li>
              <div>
                {token ? (
                  <p>로그인됨. 토큰: {token}</p>
                ) : (
                  <a href="http://localhost:8080/oauth2/authorization/kakao">
                    카카오 로그인
                  </a>
                )}
              </div>
              <div> {isLoggedIn && <span>{loginUser}님 환영합니다.</span>}</div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
