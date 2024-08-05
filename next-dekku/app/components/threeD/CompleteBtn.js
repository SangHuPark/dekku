'use client';

import { useRouter } from 'next/navigation';

const CompleteBtn = ({ selectedProducts }) => {
  const router = useRouter();

  const handleComplete = () => {
    // 선택된 상품 정보를 로컬 스토리지에 저장
    const sceneState = JSON.parse(localStorage.getItem('sceneState'));
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    localStorage.setItem('sceneState', JSON.stringify(sceneState));
    // 완성 후 페이지로 이동
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
