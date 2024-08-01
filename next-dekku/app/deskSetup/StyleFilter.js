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
  );
}
