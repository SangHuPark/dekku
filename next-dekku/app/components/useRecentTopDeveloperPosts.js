"use client";

import { useState, useEffect } from "react";
import { datas } from "../deskSetup/data";

// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  return oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

export const useRecentTopDeveloperPosts = () => {
  const [recentTopDeveloperPosts, setRecentTopDeveloperPosts] = useState([]);

  useEffect(() => {
    const oneWeekAgo = getOneWeekAgoDate();

    // 최근 일주일 내의 게시글 필터링 및 job이 "developer"인 것만 필터링
    const recentPosts = datas
      .filter((data) => data.createdAt >= oneWeekAgo && data.job === "developer");

    // 인기 게시글 정렬 (조회수 * 좋아요 수) 기준
    const sortedPosts = recentPosts
      .map((post) => ({
        ...post,
        score:
          parseInt(post.views.replace(/,/g, "")) *
          parseInt(post.likes.replace(/,/g, "")),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // 상위 3개 선택

    setRecentTopDeveloperPosts(sortedPosts);
  }, []);

  return recentTopDeveloperPosts;
};
