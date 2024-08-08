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

  useEffect(() => {
    const storedThumbnail = localStorage.getItem('thumbnail');
    if (storedThumbnail) {
      setThumbnailUrl(storedThumbnail); // 로컬 스토리지에서 썸네일 설정
    }

    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts)); // 로컬 스토리지에서 선택한 제품 목록 설정
    }
  }, []);

  const handleSave = () => {
    router.push('/threeD');
  };

  const handleShare = () => {
    router.push('/deskSetup/create');
  };

  const recommendedPosts = [
    {
      id: 1,
      imgSrc: '/images/desk1.jpg',
      profileImg: '/images/profile1.jpg',
      username: 'John Doe',
      title: 'My Awesome Desk Setup',
      views: 1234,
      likes: 56,
      comments: 18,
    },
    {
      id: 2,
      imgSrc: '/images/desk2.jpg',
      profileImg: '/images/profile2.jpg',
      username: 'Jane Doe',
      title: 'Minimalist Desk Setup',
      views: 2345,
      likes: 67,
      comments: 23,
    },
    {
      id: 3,
      imgSrc: '/images/desk3.jpg',
      profileImg: '/images/profile3.jpg',
      username: 'Bob Smith',
      title: 'Productive Workspace',
      views: 3456,
      likes: 78,
      comments: 34,
    },
  ];

  return (
    <div>
      <div>
        <Head onSave={handleSave} onShare={handleShare} />
      </div>
      <div>
        <UsedProducts selectedProducts={selectedProducts} />
      </div>
      <div>
        <RecommendSetup posts={recommendedPosts} />
      </div>
      {/* {thumbnailUrl && (
        <div>
          <img src={thumbnailUrl} alt="Thumbnail" />
          <p>Thumbnail loaded from localStorage.</p>
        </div>
      )} */}
    </div>
  );
};

export default ThreeDAfter;
