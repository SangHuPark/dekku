// components/ColorFilter.js
"use client";

import React from "react";

export default function ColorFilter({ colorFilter, setColorFilter }) {
  return (
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
  );
}
