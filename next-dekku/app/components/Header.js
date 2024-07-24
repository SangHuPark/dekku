"use client";

import Link from "next/link";
import "../styles/Header.css"; // 스타일 파일을 추가로 임포트
import { useState } from "react";
import LoginModal from "../components/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">dekku</Link>
      </div>
      <nav>
        <ul>
          <li>
            <div>
              <button className="max-w-4xl mx-auto text-white">
                <div onClick={() => setShowModal(true)}>로그인</div>
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
              </button>
            </div>
          </li>
          <li>
            <Link href="/threeD">3D Desk</Link>
          </li>
          <li>
            <Link href="/deskSetup">데스크셋업</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
