import React from 'react';

export default function SortDropdown({ sortOrder, setSortOrder }) {
  return (
    <div className="mb-2">
      <label htmlFor="sortOrder" className="mr-2">정렬:</label>
      <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="latest">최신순</option>
        <option value="likes">추천(좋아요)순</option>
        <option value="views">인기(조회수)순</option>
      </select>
    </div>
  );
}
