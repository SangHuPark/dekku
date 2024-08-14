"use client";

import { useEffect, useState } from "react";
import { useLogin } from "./AuthContext";

const LikeButton = (toPostId) => {
  const { isLoggedIn } = useLogin();
  const [isLikedPost, setIsLikedPost] = useState(false);

  useEffect(() => {
    const GetLiked = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch(
          `https://dekku.co.kr/api/deskterior-post/liked/${toPostId}`,
          {
            method: "GET",
            headers: {
              access: accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Liked or not");
        }
        const data = await response.json();
        setIsLikedPost(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetLiked();
  }, [toPostId]);

  const handleLike = async () => {
    try {
      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }
      const response = await fetch(
        `https://dekku.co.kr/api/likes/${toPostId}`,
        {
          method: "POST",
          headers: {
            access: accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const data = await response.json();
      setIsLikedPost(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handelUnlike = async () => {
    try {
      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }
      const response = await fetch(
        `https://dekku.co.kr/api/likes/${toPostId}`,
        {
          method: "DELETE",
          headers: {
            access: accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unlike post");
      }
      const data = await response.json();
      setIsLikedPost(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (!isLoggedIn) {
    alert("로그인되어 있지 않습니다.");
    return null;
  }
  return (
    <button onClick={isLikedPost ? handelUnlike : handleLike}>
      {isLikedPost && <image src="/heart_fill"/>}
      {!isLikedPost && <image src="/heart_empty"/>}
    </button>
  );
};

export default LikeButton;
