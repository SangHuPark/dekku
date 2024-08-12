"use client";

import { useState, useEffect } from "react";
import { datas } from "../deskSetup/dataFetching.js"; // datas를 import

// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date(); // 오늘 날짜를 가져옴
  const oneWeekAgo = new Date(today); // 오늘 날짜를 기준으로 새로운 Date 객체 생성
  oneWeekAgo.setDate(today.getDate() - 7); // 일주일 전 날짜로 설정
  return oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

// 개발자 직군의 최근 인기 게시글을 가져오는 훅
export const useRecentTopDeveloperPosts = () => {
  const [recentTopDeveloperPosts, setRecentTopDeveloperPosts] = useState([]); // 상태 초기화

  useEffect(() => {
    // 데이터가 존재할 때만 실행되도록 조건 추가
    if (datas && datas.length > 0) {
      const oneWeekAgo = getOneWeekAgoDate(); // 일주일 전 날짜를 계산

      // 최근 일주일 내의 게시글 중 직업이 'developer'인 게시글 필터링
      const recentPosts = datas
        .filter(
          (data) => data.createdAt >= oneWeekAgo && data.job === "developer"
        );

      // 필터링된 게시글을 조회수 * 좋아요 수로 점수를 매겨서 정렬
      const sortedPosts = recentPosts
        .map((post) => ({
          ...post,
          score:
            parseInt(post.views.replace(/,/g, "")) * // 조회수를 정수로 변환
            parseInt(post.likes.replace(/,/g, "")), // 좋아요 수를 정수로 변환
        }))
        .sort((a, b) => b.score - a.score) // 점수에 따라 내림차순 정렬
        .slice(0, 6); // 상위 6개 게시글 선택

      setRecentTopDeveloperPosts(sortedPosts); // 상태 업데이트
    }
  }, [datas]); // datas가 변경될 때마다 이 useEffect가 실행됨

  return recentTopDeveloperPosts; // 정렬된 게시글 리스트 반환
};
