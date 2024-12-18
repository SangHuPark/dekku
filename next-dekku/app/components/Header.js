"use client";

import Link from "next/link";
import { useLogin } from "./AuthContext";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin(); // setIsLoggedIn 추가
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const [headerClasses, setHeaderClasses] = useState(
    "flex justify-between px-4 py-6 max-w-6xl mx-auto"
  );

  const [memberId, setMemberId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // 쿠키 삭제 함수
  const deleteCookie = (name) => {
    document.cookie = name + "=; Max-Age=0; path=/";
  };

  // Fetch user info on component mount or when login status changes
  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");

        if (!accessToken) {
          console.log("No access token found");
          setIsLoggedIn(false);
          setMemberId(null);
          setImageUrl(null);
          return;
        }

        const response = await fetch("https://dekku.co.kr/api/users/info", {
          method: "GET",
          headers: {
            access: accessToken,
          },
        });

        if (response.status === 401) {
          // 401 에러 처리
          setIsLoggedIn(false);
          window.localStorage.removeItem("access");
          deleteCookie("refresh");
          window.location.reload();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        console.log(data);

        const id = data.id;
        const profileImageUrl = data.imageUrl;

        setMemberId(id);
        setImageUrl(profileImageUrl);  // Update the image URL with the latest info
      } catch (error) {
        console.log("error: ", error);
      }
    };

    GetUserInfo();
  }, [isLoggedIn, setIsLoggedIn]); // Re-fetch user info when login state changes

  // Adjust header styles based on the path
  useEffect(() => {
    if (pathname === "/threeD") {
      setHeaderClasses("flex justify-between py-6");
    } else {
      setHeaderClasses("flex justify-between py-6 max-w-6xl mx-auto");
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full px-4 z-50 bg-white">
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
                  <Link href="/logout">로그아웃</Link>
                </li>
                <li>
                  <Link href={`/users/${memberId}`}>
                    <img
                      src={
                        imageUrl ||
                        "https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/profile/profile.svg"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    />
                  </Link>
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
