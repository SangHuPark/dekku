"use client";

import { useEffect, useState } from "react";
import DeskSetupCard from "./DeskSetupCard"; // DeskSetupCard 컴포넌트를 가져옵니다
import { datas } from "./data"; // 데이터 파일을 가져옵니다
import Link from "next/link";

// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  return oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

export default function DeskSetupPage() {
  const [recentTopPosts, setRecentTopPosts] = useState([]);
  const [allPosts, setAllPosts] = useState(datas);
  const [filteredData, setFilteredData] = useState(datas);
  const [sortOrder, setSortOrder] = useState("latest");
  const [styleFilter, setStyleFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all"); // 직업 필터 상태 추가
  const [displayedCount, setDisplayedCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let sortedData = [...allPosts];

    // 필터링
    if (styleFilter !== "all") {
      sortedData = sortedData.filter((data) => data.style === styleFilter);
    }
    if (colorFilter !== "all") {
      sortedData = sortedData.filter((data) => data.color === colorFilter);
    }
    if (jobFilter !== "all") { // 직업 필터링
      sortedData = sortedData.filter((data) => data.job === jobFilter);
    }

    // 검색 필터링
    if (searchTerm) {
      sortedData = sortedData.filter(
        (data) =>
          data.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    if (sortOrder === "latest") {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "likes") {
      sortedData.sort(
        (a, b) =>
          parseInt(b.likes.replace(/,/g, "")) -
          parseInt(a.likes.replace(/,/g, ""))
      );
    } else if (sortOrder === "views") {
      sortedData.sort(
        (a, b) =>
          parseInt(b.views.replace(/,/g, "")) -
          parseInt(a.views.replace(/,/g, ""))
      );
    }

    setFilteredData(sortedData);
  }, [sortOrder, styleFilter, colorFilter, jobFilter, allPosts, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 전체 문서 높이와 현재 스크롤 위치를 비교하여 페이지 하단에 도달했는지 확인
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트 될 때 스크롤 이벤트 핸들러 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredData, displayedCount]);

  const loadMore = () => {
    setDisplayedCount((prevCount) =>
      Math.min(prevCount + 9, filteredData.length)
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-NanumBarunGothicOTF font-normal text-3xl mb-1">최근 데스크셋업 인기 순위</h1>
        <h3 className="font-NanumBarunGothicOTF font-light text-2xl text-[#A4A4A4] mb-4">이번주 인기 급상승</h3>
        <div className="grid grid-cols-3 gap-5 mb-12">
          {recentTopPosts.map((data) => (
            <DeskSetupCard key={data.id} data={data} />
          ))}
        </div>

        {/* <hr className="border-t-2 border-gray-400 mb-4" /> */}

        <div className="flex justify-between items-center mb-4">
          <h1 className="font-NanumBarunGothicOTF font-normal text-3xl">게시된 데스크셋업</h1>
          <div className="relative flex items-center">
            <img
              src="/search.png"
              alt="Search"
              className="absolute left-3 w-4 h-4"
            />
            <input
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 bg-gray-50 text-gray-400 border rounded"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <select
              name="정렬"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-NanumGothic font-bold p-2 bg-[#F5F5F5] text-[#757575]"
            >
              <option value="latest">최신순</option>
              <option value="views">조회순</option>
              <option value="likes">추천순</option>
            </select>
            <select
              name="스타일"
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="font-NanumGothic font-bold p-2 bg-[#F5F5F5] text-[#757575]"
            >
              <option value="all">스타일</option>
              <option value="modern">모던</option>
              <option value="minimal">미니멀</option>
              <option value="retro">레트로</option>
              <option value="lovely">러블리</option>
              <option value="gamer">게이머</option>
              <option value="study">서재</option>
              <option value="natural">자연</option>
              <option value="other">기타</option>
            </select>
            <select
              name="컬러"
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="font-NanumGothic font-bold p-2 bg-[#F5F5F5] text-[#757575] w-20"
            >
              <option value="all">컬러</option>
              <option value="black_white">블랙&화이트</option>
              <option value="black">블랙</option>
              <option value="white">화이트</option>
              <option value="gray">그레이</option>
              <option value="mint">민트</option>
              <option value="blue">블루</option>
              <option value="pink">핑크</option>
              <option value="green">그린</option>
              <option value="red">레드</option>
              <option value="yellow">옐로우</option>
              <option value="brown">브라운</option>
              <option value="other">기타</option>
            </select>
            <select
              name="직업"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="font-NanumGothic font-bold p-2 bg-[#F5F5F5] text-[#757575] w-20"
            >
              <option value="all">직업</option>
              <option value="office_worker">회사원</option>
              <option value="developer">개발자</option>
              <option value="architecture">건축</option>
              <option value="designer">디자이너</option>
              <option value="editor">편집자</option>
              <option value="writer">작가</option>
              <option value="freelancer">프리랜서</option>
              <option value="homemaker">주부</option>
              <option value="student">학생</option>
              <option value="other">기타</option>
            </select>
          </div>
          <Link
            className="font-NanumGothic bg-[#FF6E30] text-white px-2 py-3 rounded-lg"
            href="/deskSetup/create"
          >
            나의 데스크셋업 공유하기
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredData.slice(0, displayedCount).map((data) => (
            <div key={data.id}>
              <DeskSetupCard data={data} />
            </div>
          ))}
        </div>

        {displayedCount < filteredData.length && (
          <button onClick={loadMore} className="text-blue-500 mt-4">
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
