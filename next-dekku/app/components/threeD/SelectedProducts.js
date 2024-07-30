'use client';

import { useState } from 'react';

const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="p-2 overflow-auto">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        onClick={toggleCollapse}
      >
        {isCollapsed ? '펼치기' : '접기'}
      </button>
      {!isCollapsed && (
        <div>
          {selectedProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center border p-2 mb-2 rounded">
              <div>
                <h3 className="text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <button className="text-red-500" onClick={() => removeProduct(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedProducts;
