'use client';

import { useEffect, useState } from 'react';
import DeskSetupCard from './DeskSetupCard'; // DeskSetupCard 컴포넌트를 가져옵니다
import { datas } from './data'; // 데이터 파일을 가져옵니다

// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  return oneWeekAgo.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
};

export default function DeskSetupPage() {
  const [recentTopPosts, setRecentTopPosts] = useState([]);
  const [allPosts, setAllPosts] = useState(datas);
  const [filteredData, setFilteredData] = useState(datas);
  const [sortOrder, setSortOrder] = useState('latest');
  const [styleFilter, setStyleFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [displayedCount, setDisplayedCount] = useState(9);

  useEffect(() => {
    const oneWeekAgo = getOneWeekAgoDate();
    
    // 최근 일주일 내의 게시글 필터링
    const recentPosts = datas.filter(data => data.createdAt >= oneWeekAgo);

    // 인기 게시글 정렬 (조회수 * 좋아요 수) 기준
    const sortedPosts = recentPosts
      .map(post => ({
        ...post,
        score: parseInt(post.views.replace(/,/g, '')) * parseInt(post.likes.replace(/,/g, ''))
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // 상위 3개 선택

    setRecentTopPosts(sortedPosts);
  }, []);

  useEffect(() => {
    let sortedData = [...allPosts];

    // 필터링
    if (styleFilter !== 'all') {
      sortedData = sortedData.filter(data => data.style === styleFilter);
    }
    if (colorFilter !== 'all') {
      sortedData = sortedData.filter(data => data.color === colorFilter);
    }

    // 정렬
    if (sortOrder === 'latest') {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'likes') {
      sortedData.sort((a, b) => parseInt(b.likes.replace(/,/g, '')) - parseInt(a.likes.replace(/,/g, '')));
    } else if (sortOrder === 'views') {
      sortedData.sort((a, b) => parseInt(b.views.replace(/,/g, '')) - parseInt(a.views.replace(/,/g, '')));
    }

    setFilteredData(sortedData);
  }, [sortOrder, styleFilter, colorFilter, allPosts]);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 전체 문서 높이와 현재 스크롤 위치를 비교하여 페이지 하단에 도달했는지 확인
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트 될 때 스크롤 이벤트 핸들러 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredData, displayedCount]);

  const loadMore = () => {
    setDisplayedCount(prevCount => Math.min(prevCount + 9, filteredData.length));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">최근 인기 데스크 셋업</h1>
        <h3 className="text-gray-400 mb-4">조회, 관심 급상승(최근 3일)</h3>
        <div className="flex justify-center space-x-4 mb-8">
          {recentTopPosts.map(data => (
            <DeskSetupCard key={data.id} data={data} />
          ))}
        </div>
        <hr className="border-t-2 border-gray-500 mb-8" />
        <h1 className="text-2xl font-bold mb-4">모든 데스크 셋업 게시글</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <select
              name="정렬"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="latest">최신순</option>
              <option value="views">조회수순</option>
              <option value="likes">추천순</option>
            </select>
            <select
              name="스타일"
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">모든 스타일</option>
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
              className="p-2 border rounded"
            >
              <option value="all">모든 컬러</option>
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
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            글쓰기
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {filteredData.slice(0, displayedCount).map(data => (
              <DeskSetupCard key={data.id} data={data} />
            ))}
          </div>
          {displayedCount < filteredData.length && (
            <button
              onClick={loadMore}
              className="text-blue-500 mt-4"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
