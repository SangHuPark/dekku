"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    // bg-[#333] text-white
    <header className="fixed top-0 w-full z-50"> 
      <div className="max-w-6xl mx-auto flex justify-between items-center p-2">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" className="w-20" alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-end text-xs mb-2">
            <nav>
              <ul className="flex space-x-4">
                <li>고객센터</li>
                <li>마이페이지</li>
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                  >
                    로그인
                  </button>
                  <LoginModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex justify-end text-xl font-bold">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/threeD">3D 데꾸</Link>
                </li>
                <li>
                  <Link href="/deskSetup">데스크셋업</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <hr className="border-t-2 border-gray-300" />  */}
    </header>
  );
};

export default Header;
