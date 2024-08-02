'use client';

import { useState } from 'react';
import ThreeDNavBar from '../components/threeD/ThreeDNavBar';
import SelectedProducts from '../components/threeD/SelectedProducts';
import ThreeJSRenderer from '../components/threeD/ThreeJSRenderer';

const ThreeDPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('모니터');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  console.log(selectedProducts);

  return (
    <div className="flex h-screen overflow-hidden">
      <ThreeDNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addProduct={addProduct}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <div className="flex flex-col flex-grow relative border-l-2 border-gray-300">
        <div className="h-1/5 overflow-auto">
          <SelectedProducts
            selectedProducts={selectedProducts}
            removeProduct={removeProduct}
          />
        </div>
        <div className='flex-grow h-4/5 overflow-hidden'>
          <ThreeJSRenderer selectedProducts={selectedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ThreeDPage;
