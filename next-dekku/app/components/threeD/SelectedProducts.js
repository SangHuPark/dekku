'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 bg-white shadow-lg p-2 flex flex-col items-start" style={{ zIndex: 10 }}>
        <div className={`transition-transform duration-300 ${isDropdownOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`} style={{ width: '100%' }}>
          <div className="flex gap-4 mt-2">
            {selectedProducts.map((product, index) => (
              <div key={index} className="relative">
                <div className="relative">
                  <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                    onClick={() => removeProduct(index)}
                    style={{ transform: 'translate(50%, -50%)' }}
                  >
                    ×
                  </button>
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-black text-white px-2 py-1 rounded mt-2"
          onClick={toggleDropdown}
          style={{ alignSelf: 'center', marginTop: '10px' }}
        >
          {isDropdownOpen ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
};

export default SelectedProducts;
