"use client"; // 클라이언트 컴포넌트임을 명시합니다

import { useState, useEffect } from 'react';
import DeskSetupCard from './DeskSetupCard'; // DeskSetupCard 컴포넌트를 가져옵니다
import SortDropdown from './SortDropdown'; // SortDropdown 컴포넌트를 가져옵니다
import StyleFilter from './StyleFilter'; // StyleFilter 컴포넌트를 가져옵니다
import ColorFilter from './ColorFilter'; // ColorFilter 컴포넌트를 가져옵니다

export default function ClientComponent({ datas }) {
  const [filteredData, setFilteredData] = useState(datas);
  const [sortOrder, setSortOrder] = useState('latest');
  const [styleFilter, setStyleFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [displayedCount, setDisplayedCount] = useState(3);

  useEffect(() => {
    let sortedData = [...datas];

    // 정렬
    if (sortOrder === 'latest') {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date)); // assuming 'date' is a timestamp
    } else if (sortOrder === 'likes') {
      sortedData.sort((a, b) => b.likes - a.likes);
    } else if (sortOrder === 'views') {
      sortedData.sort((a, b) => b.views - a.views);
    }

    // 필터링
    if (styleFilter !== 'all') {
      sortedData = sortedData.filter(data => data.style === styleFilter);
    }
    if (colorFilter !== 'all') {
      sortedData = sortedData.filter(data => data.color === colorFilter);
    }

    setFilteredData(sortedData);
  }, [sortOrder, styleFilter, colorFilter, datas]);

  const loadMore = () => {
    setDisplayedCount(prevCount => Math.min(prevCount + 3, filteredData.length));
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-16"> {/* 추가적인 여백을 위해 pb-16 추가 */}
      {/* 드롭다운 및 버튼 */}
      <div className="mb-4">
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <StyleFilter styleFilter={styleFilter} setStyleFilter={setStyleFilter} />
        <ColorFilter colorFilter={colorFilter} setColorFilter={setColorFilter} />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-8">글쓰기</button>
      
      {/* 카드 리스트 */}
      <div className="w-full flex flex-col items-center gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl mb-8">
          {filteredData.slice(0, displayedCount).map((data) => (
            <DeskSetupCard key={data.id} data={data} />
          ))}
        </div>
        
        {/* 스크롤 시 추가 데이터 로드 */}
        {displayedCount < filteredData.length && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-center">
            <button onClick={loadMore} className="text-blue-500">Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}
