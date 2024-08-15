// components/JobFilter.js
"use client";

import React from "react";

export default function JobFilter({ jobFilter, setJobFilter }) {
  return (
    <select
      name="직업"
      value={jobFilter}
      onChange={(e) => setJobFilter(e.target.value)}
      className="font-pretendard font-bold p-2 bg-[#F5F5F5] text-[#757575] w-30"
    >
      <option value="all">직업 정보 추가</option>
      <option value="OFFICE_WORKER">회사원</option>
      <option value="DEVELOPER">개발자</option>
      <option value="ARCHITECT">건축</option>
      <option value="DESIGNER">디자이너</option>
      <option value="EDITOR">편집자</option>
      <option value="WRITER">작가</option>
      <option value="FREELANCER">프리랜서</option>
      <option value="HOMEMAKER">주부</option>
      <option value="STUDENT">학생</option>
      <option value="ETC">기타</option>
    </select>
  );
}
