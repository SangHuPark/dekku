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

  return (
    <div className="flex h-screen overflow-hidden">
      <ThreeDNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addProduct={addProduct}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <div className="h-full flex flex-col flex-grow relative border-l-2 border-gray-300">
        <div className="h-40 relative">
          <SelectedProducts
            selectedProducts={selectedProducts}
            removeProduct={removeProduct}
          />

        </div>
        <ThreeJSRenderer selectedProducts={selectedProducts} />
      </div>
    </div>
  );
};

export default ThreeDPage;
