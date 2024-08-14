"use client"; // 클라이언트 컴포넌트로 명시

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // next/navigation 모듈 사용
import ThreeDNavBar from '../components/threeD/threeDNavBar';
import SelectedProducts from '../components/threeD/SelectedProducts';
import ThreeJSRenderer from '../components/threeD/ThreeJSRenderer';
import LoginModal from '../components/LoginModal'; // LoginModal 컴포넌트 임포트

const ThreeDPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('모니터'); // 선택된 카테고리 상태
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const router = useRouter(); // next/navigation의 useRouter 사용

  useEffect(() => {
    // localStorage에서 access 토큰 확인
    const accessToken = localStorage.getItem('access');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleComplete = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      alert('로그인 후 사용 가능합니다.')
      return;
    }

    router.push('/threeDafter'); 
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ThreeDNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addProduct={(product) => setSelectedProducts([...selectedProducts, product])}
        searchTerm={searchTerm}
        onSearch={(term) => setSearchTerm(term)}
      />
      <div className="flex flex-col flex-grow relative border-l-2 border-gray-300">
        <div className="h-1/7">
          <SelectedProducts
            selectedProducts={selectedProducts}
            removeProduct={(uniqueId) =>
              setSelectedProducts((prev) => prev.filter((p) => p.uniqueId !== uniqueId))
            }
          />
        </div>
        <div className='flex-grow h-6/7 overflow-hidden'>
          <ThreeJSRenderer 
            selectedProducts={selectedProducts} 
            setSelectedProducts={setSelectedProducts} 
            onComplete={handleComplete} 
          />
        </div>
      </div>
      
      {/* 로그인 모달 렌더링 */}
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ThreeDPage;
