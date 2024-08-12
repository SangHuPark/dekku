"use client";

import Link from "next/link";
import { useLogin } from "./AuthContext";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isLoggedIn } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const [headerClasses, setHeaderClasses] = useState(
    "flex justify-between px-4 py-6 max-w-6xl mx-auto"
  );

  const [memberId, setMemberId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // 경로에 따라 클래스를 설정합니다.
    if (pathname === "/threeD") {
      setHeaderClasses("flex justify-between px-4 py-6");
    } else {
      setHeaderClasses("flex justify-between px-4 py-6 max-w-6xl mx-auto");
    }
  }, [pathname]);

  useEffect(() => {
    const OAuth2JwtHeaderFetch = async () => {
      try {
        const response = await fetch("https://dekku.co.kr/api/oauth2-jwt-header", {
          method: "POST",
          credentials: "include",
        });
        console.log(response);

        // URLSearchParams를 사용하여 쿼리 파라미터에 접근
        const params = new URLSearchParams(window.location.search);
        const id = params.get("memberId");
        const imageUrl = params.get("image_url");

        setMemberId(id);
        setImageUrl(imageUrl);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    OAuth2JwtHeaderFetch();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white">
      <div className={headerClasses}>
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" className="w-20" alt="Logo" />
          </Link>
        </div>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-8">
            <li>
              <Link href="/threeD">3D 데꾸</Link>
            </li>
            <li>
              <Link href="/deskSetup">데스크 셋업</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link href={`/users/${memberId}`}>
                    <img
                      src={imageUrl || "/default_profile.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/logout">로그아웃</Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <button onClick={() => setShowModal(true)}>로그인</button>
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
              </li>
            )}
          </ul>
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default Header;
