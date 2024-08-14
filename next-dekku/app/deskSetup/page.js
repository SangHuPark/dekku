"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import DeskSetupCard from "../components/deskSetup/DeskSetupCard";
import Link from "next/link";
import SortDropdown from "../components/deskSetup/SortDropdown";
import StyleFilter from "../components/deskSetup/StyleFilter";
import ColorFilter from "../components/deskSetup/ColorFilter";
import JobFilter from "../components/deskSetup/JobFilter";
import { useRecentTopPosts } from "../components/useRecentTopPosts";
import { fetchPosts } from "../components/deskSetup/dataFetching"; // Model import
import { filterAndSortPosts } from "../components/deskSetup/DeskSetupController"; // Controller import

export default function DeskSetupPage() {
  const recentTopPosts = useRecentTopPosts();
  const [allPosts, setAllPosts] = useState([]); // API로 불러올 데이터를 위한 상태
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [styleFilter, setStyleFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const loadMoreRef = useRef(null); // "Load More" 버튼의 ref

  useEffect(() => {
    // 데이터 가져오기
    const fetchData = async () => {
      const data = await fetchPosts();
      console.log(data);
      console.log(data);
      setAllPosts(data); // API로 받은 데이터를 allPosts에 저장
      setFilteredData(data); // 필터링을 위해 초기 상태를 설정
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    // 필터 및 정렬 적용
    const filteredAndSortedData = filterAndSortPosts(
      allPosts,
      { style: styleFilter, color: colorFilter, job: jobFilter },
      sortOrder,
      searchTerm
    );
    setFilteredData(filteredAndSortedData);
  }, [sortOrder, styleFilter, colorFilter, jobFilter, allPosts, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredData, displayedCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredData.length) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [filteredData, displayedCount]);

  const loadMore = () => {
    setDisplayedCount((prevCount) =>
      Math.min(prevCount + 9, filteredData.length)
    );
  };

  console.log(filteredData);

  return (
    <div>
      <div className="bg-[#F6F7FB] py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold text-3xl mt-3 mb-3">
            최근 데스크 셋업 인기 순위
          </h1>
          <h3 className="text-2xl text-[#A4A4A4] mb-6">이번주 인기 급상승</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <Suspense>
              {recentTopPosts.map((data) => (
                <DeskSetupCard
                  key={data.id}
                  data={data}
                  isNoProfilePost={true}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mt-6 mb-6">
          <h1 className="font-bold text-3xl">게시된 데스크 셋업</h1>
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

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Suspense>
              <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
              <StyleFilter
                styleFilter={styleFilter}
                setStyleFilter={setStyleFilter}
              />
              <ColorFilter
                colorFilter={colorFilter}
                setColorFilter={setColorFilter}
              />
              <JobFilter jobFilter={jobFilter} setJobFilter={setJobFilter} />
            </Suspense>
          </div>
          <Link
            className="bg-[#FF6E30] text-white px-2 py-3 rounded-lg"
            href="/deskSetup/create"
          >
            나의 데스크 셋업 공유하기
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredData.slice(0, displayedCount).map((data) => (
            <DeskSetupCard key={data.id} data={data} />
          ))}
        </div>

        <button ref={loadMoreRef} className="text-blue-500 mt-3">
          Load More
        </button>
      </div>
    </div>
  );
}
