'use client';

import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import products from './ProductList';

const ThreeDNavBar = ({ selectedCategory, setSelectedCategory, addProduct, searchTerm, onSearch }) => {
  const filteredProducts = products[selectedCategory].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryImages = {
    '모니터': '/category/monitor.png',
    '노트북': '/category/laptop.png',
    '데스크': '/category/desk.png',
    '마우스': '/category/computer-mouse.png',
    '키보드': '/category/keyboard.png',
    '기타': '/category/menu-dots-square.png',
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 p-2 w-full flex border-b-2 border-gray-300">
        <ul className="list-none p-0 flex flex-row space-x-4">
          {Object.keys(products).map((category) => (
            <li key={category}>
              <button
                className={`block h-12 bg-gray-100 rounded hover:bg-gray-300 ${selectedCategory === category ? 'bg-gray-400' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <img src={categoryImages[category]} alt={category} className="h-full w-auto mx-auto" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 bg-white w-full border-b-2 border-gray-300">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="p-2 bg-white w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} {...product} addProduct={addProduct} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ThreeDNavBar;
