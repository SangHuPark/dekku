import React from 'react';

const SaveModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <div className="text-center">
          <p className="text-xl mb-4">성공적으로 저장되었습니다! 저장된 모델은 마이페이지에서 확인 가능합니다! 🎉</p>
          <button 
            onClick={onClose} 
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
