// components/StyleFilter.js
"use client";

import React from "react";

export default function StyleFilter({ styleFilter, setStyleFilter }) {
  return (
    <select
      name="스타일"
      value={styleFilter}
      onChange={(e) => setStyleFilter(e.target.value)}
      className="font-pretendard font-bold p-2 bg-[#F5F5F5] text-[#757575]"
    >
      <option value="all">스타일 정보 추가</option>
      <option value="MODERN">모던</option>
      <option value="MINIMAL">미니멀</option>
      <option value="RETRO">레트로</option>
      <option value="LOVELY">러블리</option>
      <option value="GAMER">게이머</option> 
      <option value="LIBRARY">서재</option>
      <option value="NATURE">자연</option>
      <option value="ETC">기타</option>
    </select>
  );
}
