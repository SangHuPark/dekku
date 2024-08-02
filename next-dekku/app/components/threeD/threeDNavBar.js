'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import products from './ProductList';
import { v4 as uuidv4 } from 'uuid';

const ThreeDNavBar = ({ selectedCategory, setSelectedCategory, addProduct, searchTerm, onSearch }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const filteredProducts = products[activeCategory]?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categoryImages = {
    '모니터': '/category/monitor.png',
    '노트북': '/category/laptop.png',
    '데스크': '/category/desk.png',
    '마우스': '/category/computer-mouse.png',
    '키보드': '/category/keyboard.png',
    '기타': '/category/menu-dots-square.png',
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col" style={{ width: '543.5px' }}>
      {/* 카테고리 선택 바 */}
      <div className="bg-gray-100 p-2 w-full flex border-b-2 border-gray-300">
        <ul className="list-none p-0 flex flex-row relative space-x-6 ml-10">
          {Object.keys(products).map((category) => (
            <li key={category} className="relative flex flex-col items-center">
              <button
                className={`flex items-center space-x-2 h-12 bg-gray-100 rounded hover:bg-gray-300 ${
                  activeCategory === category ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <img 
                  src={categoryImages[category]} 
                  alt={category} 
                  className={`h-6 w-6 ${activeCategory === category ? 'h-8 w-8' : ''}`} 
                />
                {activeCategory === category && (
                  <span className="text-black whitespace-nowrap">
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
      {/* 검색 바 */}
      <div className="p-2 bg-white w-full border-b-2 border-gray-300">
        <SearchBar onSearch={onSearch} />
      </div>
      {/* 아이템 선택 바 */}
      <div className="p-8 bg-white w-full flex flex-wrap gap-4">
        {filteredProducts.map((product, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ProductCard {...product} addProduct={() => addProduct({ ...product, id: uuidv4() })} />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ThreeDNavBar;
