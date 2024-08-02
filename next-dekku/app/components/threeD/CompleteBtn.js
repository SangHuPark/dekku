'use client';

import { useRouter } from 'next/navigation';

const CompleteBtn = ({ selectedProducts }) => {
  const router = useRouter();

  const handleComplete = () => {
    // 선택된 상품 정보를 로컬 스토리지에 저장
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    // 완성 후 페이지로 이동
    router.push('/threeDafter');
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded mt-2 fixed bottom-10 right-10"
      onClick={handleComplete}
      style={{ zIndex: 10 }}
    >
      완성하기
    </button>
  );
};

export default CompleteBtn;
