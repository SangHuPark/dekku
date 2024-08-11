"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "../components/AuthContext";
import { useEffect, Suspense } from "react";

const OAuth2Redirect = () => {
  const router = useRouter();
  const { setIsLoggedIn, setLoginUser } = useLogin();
  const queryParams = useSearchParams();

  useEffect(() => {
    const OAuth2JwtHeaderFetch = async () => {
      try {
        
        const response = await fetch("/api/oauth2-jwt-header", {
          method: "POST",
          credentials: "include",
        });

        console.log(response);

        if (response.ok) {
          // local storage access token set
          window.localStorage.setItem("access", response.headers.get("access"));

          // local storage name set
          const name = queryParams.get("name");
          window.localStorage.setItem("name", name);

          setIsLoggedIn(true);
          setLoginUser(name);
          router.push("/", { replace: true });
        } else {
          alert("접근할 수 없는 페이지입니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    OAuth2JwtHeaderFetch();
  }, [queryParams, router, setIsLoggedIn, setLoginUser]);

  return null; // 이 컴포넌트는 화면에 아무 것도 렌더링하지 않으므로 `null` 반환
};

const OAuth2RedirectWithSuspense = () => {
  return (
    <Suspense>
      <OAuth2Redirect />
    </Suspense>
  );
};

export default OAuth2RedirectWithSuspense;
