'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '../LoginModal'; // LoginModal 컴포넌트 임포트

const CompleteBtn = ({ scene, captureThumbnail, saveModelData }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  useEffect(() => {
    // localStorage에서 access 토큰 확인
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleComplete = () => {
    console.log('isLoggedIn', isLoggedIn); // 로그인 상태 확인용

    if (!isLoggedIn) {
      // 로그인이 되어있지 않으면 모달을 띄움
      setShowModal(true);
      alert('로그인 후 사용 가능합니다.')
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
    <>
      <button
        className="bg-cyan-800 text-white px-10 py-4 rounded mt-2 fixed bottom-10 right-10 text-lg"
        onClick={handleComplete}
        style={{ zIndex: 10 }}
      >
        완성하기
      </button>
      
      {/* 로그인 모달 렌더링 */}
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CompleteBtn;
