"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "../components/AuthContext";
import { useEffect } from "react";

const OAuth2Redirect = () => {
  const router = useRouter();
  const { setIsLoggedIn, setLoginUser } = useLogin();
  const queryParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this runs only on the client

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

  return null; // This component does not render anything
};

export default OAuth2Redirect;
