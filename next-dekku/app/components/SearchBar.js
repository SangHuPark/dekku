'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

// SearchBar 컴포넌트는 검색어를 입력받고 검색 이벤트를 트리거합니다.
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리

  // 검색어 변경 시 호출되는 함수
  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (typeof onSearch === 'function') {
      onSearch(term); // 검색어 변경 시 상위 컴포넌트로 전달
    }
  };

  return (
    <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
      {/* 검색 입력 필드 */}
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleChange}
      />
      {/* 검색 버튼 */}
      <button
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        onClick={() => onSearch(searchTerm)}
      >
        검색
      </button>
    </div>
  );
};

// PropTypes를 사용하여 onSearch가 함수인지 확인
// SearchBar.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

export default SearchBar;
