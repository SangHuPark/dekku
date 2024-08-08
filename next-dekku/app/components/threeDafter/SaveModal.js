import React from 'react';

const SaveModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <div className="text-center">
          <p className="text-2xl mb-4">🎉</p>
          <p className="text-xl mb-4">{message}</p>
          <button 
            onClick={onClose} 
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
