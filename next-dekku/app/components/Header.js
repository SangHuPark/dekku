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

  // 사용자 데이터 상태 관리
  const [userData, setUserData] = useState({ memberId: null, imageUrl: null });

  useEffect(() => {
    // 경로에 따라 클래스를 설정합니다.
    if (pathname === "/threeD") {
      setHeaderClasses("flex justify-between px-4 py-6");
    } else {
      setHeaderClasses("flex justify-between px-4 py-6 max-w-6xl mx-auto");
    }
  }, [pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      // 서버에서 사용자 데이터를 가져오는 API 호출
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/getUserData", { method: "GET" }); // 이 URL을 실제 API 엔드포인트로 교체
          const data = await response.json();

          setUserData({
            memberId: data.memberId,
            imageUrl: data.image_url,
          });
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

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
                  <Link href={`/users/${userData.memberId}`}>
                    <img
                      src={userData.imageUrl || "/default_profile.png"}
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
