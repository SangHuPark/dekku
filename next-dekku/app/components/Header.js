"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between">
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
              <Link href="/deskSetup">데스크셋업</Link>
            </li>
            <li>
              <Link href="/">커뮤니티</Link>
            </li>
            <li>
              <button
                className="flex items-center"
                onClick={() => setShowModal(true)}
              >
                <img src="/profile.png" />
              </button>
              <LoginModal showModal={showModal} setShowModal={setShowModal} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
