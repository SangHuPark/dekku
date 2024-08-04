'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 shadow-lg p-2 flex flex-col items-start" style={{ zIndex: 10 }}>
        {/* 접기펴기 버튼 */}
        <button
          className="bg-white text-black px-2 py-1 rounded mt-2"
          onClick={toggleDropdown}
          style={{ alignSelf: 'center', marginTop: '10px' }}
        >
          {isDropdownOpen ? '▲' : '▼'}
        </button>
        {/* 폈을 때 나오는 현재 선택 상품 리스트 */}
        <div className={`transition-transform duration-300 ${isDropdownOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`} style={{ width: '100%' }}>
          <div className="flex gap-4 mt-1 overflow-x-auto overflow-y-hidden whitespace-nowrap" style={{ padding: '1px', boxSizing: 'border-box' }}>
            {selectedProducts.map((product, index) => (
              <div key={index} className="relative flex-shrink-0 inline-block" style={{ width: '150px' }}>
                <ProductCard {...product} small />
                <button 
                  className="absolute top-3 right-5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                  onClick={(e) => { e.stopPropagation(); removeProduct(index); }}
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProducts;
