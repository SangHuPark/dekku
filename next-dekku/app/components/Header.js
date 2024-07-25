"use client";
// 나중에 레이아웃에서 헤더 상단 고정 필요
import Link from "next/link";
import "../styles/Header.css";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="flex justify-between p-2 bg-[#333]">
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.png" className="w-32"/>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end text-xs">
          <nav>
            <ul>
              <li className="text-white">고객센터</li>
              <li className="text-white">마이페이지</li>
              <li>
                <div>
                  <button className="max-w-4xl mx-auto text-white">
                    <div onClick={() => setShowModal(true)}>로그인</div>
                    <LoginModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex font-bold justify-end mt-4 mb-4">
          <nav>
            <ul>
              <li></li>
              <li>
                <Link href="/threeD" className="text-xl">3D Desk</Link>
              </li>
              <li>
                <Link href="/deskSetup" className="text-xl">데스크셋업</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
