'use client';

import { useEffect, useState } from 'react';

const UsedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 선택된 상품 정보 불러오기
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const renderProducts = () => {
    const productsToShow = showAll ? selectedProducts : selectedProducts.slice(0, 4);
    return productsToShow.map((product, index) => (
      <div key={index} className="border p-4 rounded shadow-lg">
        <h2 className="text-xl">{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        {product.image && <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />}
      </div>
    ));
  };

  return (
    <div className="p-8 h-screen overflow-y-auto"> {/* 양옆 패딩을 더 줌 */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl mb-4">선택한 상품 목록</h2>
        {selectedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* 그리드 레이아웃 */}
              {renderProducts()}
            </div>
            {selectedProducts.length > 4 && !showAll && (
              <div className="text-right">
                <button onClick={handleShowAll} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                  모두보기
                </button>
              </div>
            )}
          </>
        ) : (
          <p>선택된 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default UsedProducts;
