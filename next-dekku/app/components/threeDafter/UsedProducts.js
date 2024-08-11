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
    setShowAll(!showAll);
  };

  const renderProducts = () => {
    const productsToShow = showAll ? selectedProducts : selectedProducts.slice(0, 4);
    return productsToShow.map((product, index) => (
      <div key={index} className="border p-4 rounded-lg shadow-lg h-72 border-gray-300"> {/* 테두리 스타일 추가 */}
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-gray-800 mb-2">{product.price}</p>
        {product.image && <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded" />} {/* 이미지에 둥근 모서리 추가 */}
      </div>
    ));
  };

  return (
    <div className="mb-32 mt-40">
      <div className={`max-w-6xl mx-auto ${showAll ? 'h-auto' : 'h-[350px]'}`}> 
        <h2 className="text-3xl mb-4">선택한 상품 목록</h2>
        {selectedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderProducts()}
            </div>
            {selectedProducts.length > 4 && (
              <div className="text-left mt-4">
                <button onClick={handleShowAll} className="px-4 py-2 bg-black text-white rounded">
                  {showAll ? '접기' : '모두보기'}
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
