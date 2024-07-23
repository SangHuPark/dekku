'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import products from './ProductList';

const ProductDisplay = ({ selectedCategory }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="p-5 overflow-auto">
      <div className="grid grid-cols-5 gap-4">
        {products[selectedCategory].slice(0, showMore ? products[selectedCategory].length : 5).map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
        {products[selectedCategory].length > 5 && !showMore && (
          <button className="p-2 bg-blue-500 text-white rounded" onClick={() => setShowMore(true)}>
            더보기
          </button>
        )}
      </div>
      {showMore && (
        <div className="mt-4">
          <button className="p-2 bg-red-500 text-white rounded" onClick={() => setShowMore(false)}>
            접기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
