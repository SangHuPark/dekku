// components/SortDropdown.js
"use client";

import React from "react";

export default function SortDropdown({ sortOrder, setSortOrder }) {
  return (
    <select
      name="정렬"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="font-pretendard font-bold p-2 bg-[#F5F5F5] text-[#757575]"
    >
      <option value="latest">최신순</option>
      <option value="views">조회순</option>
      <option value="likes">추천순</option>
    </select>
  );
}
