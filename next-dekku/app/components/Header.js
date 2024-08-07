"use client";

import Link from "next/link";

const Header = () => {
 
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
              <Link href="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
