'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CompleteBtn = ({ scene, captureThumbnail, saveModelData }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 access 토큰 확인
    const accessToken = localStorage.getItem('access');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleComplete = () => {
    if (!isLoggedIn) {
      // 로그인이 되어있지 않으면 알림을 띄운 후 로그인 페이지로 리다이렉트
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      router.push('/login');
      return;
    }

    if (scene) {
      saveModelData();
      const thumbnail = captureThumbnail();
      console.log('Thumbnail stored:', thumbnail);
      localStorage.setItem('thumbnail', thumbnail);
    }

    router.push('/threeDafter');
  };

  return (
    <button
      className="bg-cyan-800 text-white px-10 py-4 rounded mt-2 fixed bottom-10 right-10 text-lg"
      onClick={handleComplete}
      style={{ zIndex: 10 }}
    >
      완성하기
    </button>
  );
};

export default CompleteBtn;
