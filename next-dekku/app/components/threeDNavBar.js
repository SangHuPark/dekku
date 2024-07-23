'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import products from './ProductList';

// ThreeDNavBar 컴포넌트는 카테고리와 상품 리스트를 보여줍니다.
const ThreeDNavBar = ({ selectedCategory, setSelectedCategory, addProduct, searchTerm, onSearch }) => {
  const [showMore, setShowMore] = useState(false); // 더보기 버튼 상태 관리

  // 검색어에 따라 상품을 필터링
  const filteredProducts = products[selectedCategory].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* 카테고리 리스트 */}
      <div className="bg-pink-300 p-2 w-1/6 border-r-2 border-gray-300">
        <ul className="list-none p-0 flex flex-col mt-4">
          {Object.keys(products).map((category) => (
            <li key={category} className="mb-2">
              <button
                className={`block p-1 bg-pink-200 rounded hover:bg-pink-400 ${
                  selectedCategory === category ? 'bg-pink-400' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 상품 리스트 */}
      <div className="flex-grow p-2 bg-white">
        <div className="mb-2">
          {/* 검색 바 컴포넌트에 onSearch prop을 전달 */}
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="mt-2 overflow-auto">
          <div className="grid grid-cols-3 gap-2">
            {/* 필터링된 상품 리스트 */}
            {filteredProducts.slice(0, showMore ? filteredProducts.length : 6).map((product, index) => (
              <ProductCard key={index} {...product} addProduct={addProduct} />
            ))}
          </div>
          {/* 더보기 버튼 */}
          {filteredProducts.length > 6 && (
            <button className="mt-2 p-1 bg-blue-500 text-white rounded" onClick={() => setShowMore(!showMore)}>
              {showMore ? '접기' : '더보기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeDNavBar;
