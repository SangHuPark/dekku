'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

// SelectedProducts 컴포넌트 정의
const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  // 드롭다운 토글 핸들러
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <div className="bg-white absolute top-0 left-0 right-0 shadow-lg p-2 flex flex-col items-start" style={{ zIndex: 10 }}>        
        {/* 드롭다운 내용 */}
        <div className={`transition-transform duration-300 ${isDropdownOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`} style={{ width: '100%' }}>
          <div className="flex gap-4 mt-1 overflow-x-auto overflow-y-hidden whitespace-nowrap" style={{ padding: '1px', boxSizing: 'border-box' }}>
            {selectedProducts.map((product) => (
              <div key={product.uniqueId} className="relative flex-shrink-0 inline-block" style={{ width: '150px' }}>
                <ProductCard {...product} small />
                {/* 제품 제거 버튼 */}
                <button 
                  className="absolute top-3 right-5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Removing product with uniqueId: ${product.uniqueId}`);
                    removeProduct(product.uniqueId);
                  }}
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>      
          {/* 드롭다운 버튼 */}
          <button
            className="bg-white text-black px-2 py-1 rounded mt-2"
            onClick={toggleDropdown}
            style={{ alignSelf: 'center', marginTop: '10px' }}
          >
            {isDropdownOpen ? '▲' : '▼'}
          </button>
      </div>
    </div>
  );
};

export default SelectedProducts;
