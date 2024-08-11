'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import products from './ProductList';
import { v4 as uuidv4 } from 'uuid';

const ThreeDNavBar = ({ selectedCategory, setSelectedCategory, addProduct, searchTerm, onSearch }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  // 선택된 카테고리에 따라 필터링된 제품 목록
  const filteredProducts = (products[activeCategory]?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []).map(product => ({
    ...product,
    uniqueId: product.uniqueId || uuidv4()
  }));

  // 카테고리 이미지 매핑
  const categoryImages = {
    '모니터': '/category/monitor.png',
    '노트북': '/category/laptop.png',
    '데스크': '/category/desk.png',
    '마우스': '/category/computer-mouse.png',
    '키보드': '/category/keyboard.png',
    '기타': '/category/menu-dots-square.png',
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col" style={{ width: '543.5px', minWidth: '543.5px' }}>
      {/* 카테고리 버튼 영역 */}
      <div className="bg-gray-100 p-2 w-full flex border-b-2 border-gray-300">
        <ul className="list-none p-0 flex flex-row relative space-x-6 ml-10">
          {Object.keys(products).map((category) => (
            <li key={category} className="relative flex flex-col items-center">
              <button
                className={`flex items-center space-x-2 h-12 bg-gray-100 rounded hover:scale-110 ${
                  activeCategory === category ? 'scale-110' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <img 
                  src={categoryImages[category]} 
                  alt={category} 
                  className={`h-6 w-6 ${activeCategory === category ? 'h-8 w-8' : ''}`} 
                />
                {activeCategory === category && (
                  <span className="text-black text-sm tracking-tighter">
                    {category}
                  </span>
                )}
              </button>
              {activeCategory === category && (
                <div className="w-full h-1 bg-black mt-1"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* 검색바 영역 */}
      <div className="p-2 bg-white w-full border-b-2 border-gray-300">
        <SearchBar onSearch={onSearch} />
      </div>
      {/* 필터링된 제품 목록 영역 */}
      <div className="p-8 bg-white w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.uniqueId} // 각 제품에 고유한 key prop으로 uniqueId를 사용합니다.
            {...product} 
            addProduct={addProduct} // 제품 추가 함수 전달
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ThreeDNavBar;
