'use client';

import { useState } from 'react';

// SelectedProducts 컴포넌트는 선택된 상품들을 드롭다운 형식으로 보여줍니다.
const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태 관리

  return (
    <div className="absolute top-0 w-full bg-gray-200 border-b-2 border-gray-300 z-10">
      {/* 드롭다운 버튼 */}
      <button
        className="w-full text-left p-2 bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '선택한 상품 접기' : '선택한 상품 펼치기'}
      </button>
      {/* 드롭다운 내용 */}
      {isOpen && (
        <div className="p-2 overflow-x-auto whitespace-nowrap">
          <div className="inline-flex">
            {selectedProducts.map((product, index) => (
              <div key={index} className="relative border p-2 rounded bg-white m-1 flex-shrink-0">
                {/* 삭제 버튼 */}
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={() => removeProduct(index)}
                >
                  &times;
                </button>
                {/* 상품 이미지 */}
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover" onError={(e) => { e.target.src = '/fallback-image.png'; }} />
                {/* 상품 이름 */}
                <div className="mt-2">{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedProducts;
