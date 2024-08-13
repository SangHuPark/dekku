"use client";

import { useState, useEffect } from "react";


// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  return oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

export const useRecentTopPosts = () => {
  const [recentTopPosts, setRecentTopPosts] = useState([]);
  const datas = null
  useEffect(() => {
    if (datas && Array.isArray(datas)) { // datas가 존재하고 배열인지 확인
      const oneWeekAgo = getOneWeekAgoDate();

      // 최근 일주일 내의 게시글 필터링
      const recentPosts = datas.filter((data) => data.createdAt >= oneWeekAgo);

      // 인기 게시글 정렬 (조회수 * 좋아요 수) 기준
      const sortedPosts = recentPosts
        .map((post) => ({
          ...post,
          score:
            parseInt(post.views.replace(/,/g, "")) *
            parseInt(post.likes.replace(/,/g, "")),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // 상위 3개 선택

      setRecentTopPosts(sortedPosts);
    } else {
      console.error("datas가 존재하지 않거나 배열 형식이 아닙니다.");
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return recentTopPosts;
};
