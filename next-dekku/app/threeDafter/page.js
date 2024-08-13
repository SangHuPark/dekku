"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // next/navigation 모듈 사용
import Head from '../components/threeDafter/Head';
import UsedProducts from '../components/threeDafter/UsedProducts';
import RecommendSetup from '../components/threeDafter/RecommendSetup';

const ThreeDAfter = () => {
  const router = useRouter();
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 access 토큰 확인
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      // 로그인이 되어 있지 않다면 로그인 페이지로 리다이렉트
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedThumbnail = localStorage.getItem('thumbnail');
      if (storedThumbnail) {
        setThumbnailUrl(storedThumbnail); // 로컬 스토리지에서 썸네일 설정
      }

      const storedProducts = localStorage.getItem('selectedProducts');
      if (storedProducts) {
        setSelectedProducts(JSON.parse(storedProducts)); // 로컬 스토리지에서 선택한 제품 목록 설정
      }
    }
  }, [isLoggedIn]);

  const handleShare = () => {
    router.push('/deskSetup/create-afterthreed'); // 공유 버튼 동작
  };

  if (!isLoggedIn) {
    return null; // 로그인 상태가 확인될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <div>
      <div>
        <Head onShare={handleShare} />
      </div>
      <div>
        <UsedProducts selectedProducts={selectedProducts} />
      </div>
      <div>
        <RecommendSetup posts={selectedProducts} /> {/* 선택된 제품 기반 추천 세팅 */}
      </div>
    </div>
  );
};

export default ThreeDAfter;
