// components/ColorFilter.js
"use client";

import React from "react";

export default function ColorFilter({ colorFilter, setColorFilter }) {
  return (
    <select
      name="컬러"
      value={colorFilter}
      onChange={(e) => setColorFilter(e.target.value)}
      className="font-pretendard font-bold p-2 bg-[#F5F5F5] text-[#757575] w-30"
    >
      <option value="NON_SELECT">컬러 정보 추가</option>
      <option value="BLACK_AND_WHITE">블랙&화이트</option>
      <option value="BLACK">블랙</option>
      <option value="WHITE">화이트</option>
      <option value="GRAY">그레이</option>
      <option value="MINT">민트</option>
      <option value="BLUE">블루</option>
      <option value="PINK">핑크</option>
      <option value="GREEN">그린</option>
      <option value="RED">레드</option>
      <option value="YELLOW">옐로우</option>
      <option value="BROWN">브라운</option>
      <option value="ETC">기타</option>
    </select>
  );
}
