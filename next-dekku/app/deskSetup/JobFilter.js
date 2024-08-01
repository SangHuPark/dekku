// components/JobFilter.js
"use client";

import React from "react";

export default function JobFilter({ jobFilter, setJobFilter }) {
  return (
    <select
      name="직업"
      value={jobFilter}
      onChange={(e) => setJobFilter(e.target.value)}
      className="font-NanumGothic font-bold p-2 bg-[#F5F5F5] text-[#757575] w-20"
    >
      <option value="all">직업</option>
      <option value="office_worker">회사원</option>
      <option value="developer">개발자</option>
      <option value="architecture">건축</option>
      <option value="designer">디자이너</option>
      <option value="editor">편집자</option>
      <option value="writer">작가</option>
      <option value="freelancer">프리랜서</option>
      <option value="homemaker">주부</option>
      <option value="student">학생</option>
      <option value="other">기타</option>
    </select>
  );
}
