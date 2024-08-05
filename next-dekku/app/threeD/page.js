"use client"; // 클라이언트 컴포넌트로 명시

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // next/navigation 모듈 사용
import ThreeDNavBar from '../components/threeD/ThreeDNavBar';
import SelectedProducts from '../components/threeD/SelectedProducts';
import ThreeJSRenderer from '../components/threeD/ThreeJSRenderer';

const ThreeDPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('모니터'); // 선택된 카테고리 상태
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const router = useRouter(); // next/navigation의 useRouter 사용

  // 검색어 변경 핸들러
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 제품 추가 핸들러
  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  // 제품 제거 핸들러
  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  // 완성 핸들러
  const handleComplete = () => {
    router.push('/threeDafter'); // 썸네일을 쿼리 파라미터로 전달하지 않음
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ThreeDNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addProduct={addProduct}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <div className="flex flex-col flex-grow relative border-l-2 border-gray-300">
        <div className="h-1/7">
          <SelectedProducts
            selectedProducts={selectedProducts}
            removeProduct={removeProduct}
          />
        </div>
        <div className='flex-grow h-6/7 overflow-hidden'>
          <ThreeJSRenderer selectedProducts={selectedProducts} onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default ThreeDPage;
