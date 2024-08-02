'use client';

import { useEffect, useState } from 'react';

const ThreeDAfterPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 선택된 상품 정보 불러오기
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">완성된 페이지</h1>
      {selectedProducts.length > 0 ? (
        <ul className="space-y-4">
          {selectedProducts.map((product, index) => (
            <li key={index} className="border p-2 rounded shadow">
              <h2 className="text-xl">{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              {product.image && <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />}
            </li>
          ))}
        </ul>
      ) : (
        <p>선택된 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default ThreeDAfterPage;
