'use client';

import { useState } from 'react';
import ThreeDNavBar from '../components/ThreeDNavBar';
import ThreeDMainContent from '../components/ThreeDMainContent';
import SelectedProducts from '../components/SelectedProducts';

// ThreeDPage 컴포넌트는 전체 레이아웃을 구성합니다.
const ThreeDPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('모니터'); // 현재 선택된 카테고리 상태 관리
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 상품 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리

  // 검색어 변경 시 호출되는 함수
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 상품을 추가하는 함수
  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  // 상품을 삭제하는 함수
  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen">
      {/* 네비게이션 바 */}
      <ThreeDNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addProduct={addProduct}
        searchTerm={searchTerm} // 검색어 상태 전달
        onSearch={handleSearch} // 검색어 변경 함수 전달
      />
      {/* 3D 모델을 보여주는 메인 컨텐츠 */}
      <div className="flex flex-col flex-grow relative border-l-2 border-gray-300">
        <div className="flex-grow h-4/5 overflow-hidden">
          <ThreeDMainContent selectedProducts={selectedProducts} />
        </div>
        {/* 선택된 상품을 보여주는 드롭다운 */}
        <div className="h-1/5 overflow-auto">
          <SelectedProducts
            selectedProducts={selectedProducts}
            removeProduct={removeProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeDPage;
