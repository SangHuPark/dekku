"use client";

import { useEffect, useState } from "react";
import { useLogin } from "./AuthContext";

const FollowButton = ({ toMemberId, setFollowChangeTrigger }) => {
  const { isLoggedIn } = useLogin();
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch(
          `https://dekku.co.kr/api/follows/is-following/${toMemberId}`,
          {
            method: "GET",
            headers: {
              access: accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        console.log(response);
        console.log(data);
        setIsFollowing(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetUserInfo();
  }, [isFollowing, toMemberId]);

  const handleFollow = async () => {
    try {
      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }
      const response = await fetch(
        `https://dekku.co.kr/api/follows/follow/${toMemberId}`,
        {
          method: "POST",
          headers: {
            access: accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to follow user");
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      setIsFollowing(true);
      setFollowChangeTrigger(prev => !prev);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }
      const response = await fetch(
        `https://dekku.co.kr/api/follows/unfollow/${toMemberId}`,
        {
          method: "POST",
          headers: {
            access: accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      setIsFollowing(false);
      setFollowChangeTrigger(prev => !prev);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <button
      className="rounded px-3 p-1 h-8 bg-[#77C3EB] text-white flex-shrink-0 hover:bg-[#09addb]"
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </button>
  );
};

export default FollowButton;
