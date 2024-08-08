"use client";

import Link from "next/link";
import { useLogin } from "./AuthContext";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 수정된 부분

const Header = () => {
  const { isLoggedIn } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname(); // usePathname 훅을 사용하여 pathname을 가져옵니다.

  const [headerClasses, setHeaderClasses] = useState('max-w-6xl mx-auto flex justify-between');

  useEffect(() => {
    // 경로에 따라 클래스를 설정합니다.
    if (pathname === '/threeD') {
      setHeaderClasses('flex justify-between');
    } else {
      setHeaderClasses('max-w-6xl mx-auto flex justify-between');
    }
  }, [pathname]); // pathname이 변경될 때마다 useEffect가 호출됩니다.

  return (
    <header className="fixed top-0 w-full z-50 bg-white px-4 py-6">
      <div className={headerClasses}>
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" className="w-20" alt="Logo" />
          </Link>
        </div>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-8 text-lg">
            <li>
              <Link href="/threeD">3D 데꾸</Link>
            </li>
            <li>
              <Link href="/deskSetup">데스크 셋업</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link href="/profile">프로필</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <button onClick={() => setShowModal(true)}>로그인</button>
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link href="/logout">로그아웃</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
