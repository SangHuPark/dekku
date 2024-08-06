"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import accessToken from "./accessToken";

const Header = () => {
  const { data: session } = useSession();

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
                {!session ? (
                  <>
                    <button onClick={() => signIn("kakao")}>
                      Login with Kakao
                    </button>
                  </>
                ) : (
                  <>
                    <p>Welcome, {session.user.name}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                    <div>Access Token : {session.accessToken}</div>
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
