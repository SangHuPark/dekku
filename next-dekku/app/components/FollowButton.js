// API 변경되면 그 때 마저 하겠습니다!!!!!!!

"use client"

import { useEffect } from "react";
import { useLogin } from "./AuthContext";

const FollowButton = (toMemberId) => {
  const { isLoggedIn } = useLogin();
  const [memberId, setMemberId] = useState(null);
  const [allFollowers, setAllFollowers] = useState(null);
  const [isFollower, setIsFollower] = useState(false);

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch("https://dekku.co.kr/api/users/info", {
          method: "GET",
          headers: {
            access: accessToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        console.log(data);

        const id = data.id;
        console.log(id);

        setMemberId(id);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetUserInfo();
  }, [toMemberId]);

  useEffect(() => {
    const GetFollowings = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/following/${toMemberId.params.memberId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setAllFollowers(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetFollowings();
  }, [toMemberId]);

  if (!isLoggedIn) {
    alert("로그인되어 있지 않습니다.");
    return null;
  }
  return <>hi</>;
};

export default FollowButton;
