import React from 'react';

export default function StyleFilter({ styleFilter, setStyleFilter }) {
  return (
    <div className="mb-2">
      <label htmlFor="styleFilter" className="mr-2">스타일:</label>
      <select id="styleFilter" value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
        <option value="all">모두</option>
        <option value="modern">모던</option>
        <option value="minimal">미니멀</option>
        <option value="retro">레트로</option>
        <option value="lovely">러블리</option>
        <option value="gamer">게이머</option>
        <option value="study">서재</option>
        <option value="nature">자연</option>
        <option value="other">기타</option>
      </select>
    </div>
  );
}
