'use client';

import { useRouter } from 'next/navigation';

const CompleteBtn = ({ scene, captureThumbnail, saveModelData }) => {
  const router = useRouter();

  const handleComplete = () => {
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
