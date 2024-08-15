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
    <div className="flex h-full" style={{ width: '420px' }}>
      <div className="bg-gray-100 p-2 w-1/7 border-r-2 border-gray-300">
        <ul className="list-none p-0 flex flex-col mt-4 space-y-4">
          {Object.keys(products).map((category) => (
            <li key={category}>
              <button
                className={`block w-full h-12 bg-gray-100 rounded hover:bg-gray-300 ${
                  selectedCategory === category ? 'bg-gray-400' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <img src={categoryImages[category]} alt={category} className="h-full w-auto mx-auto" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow p-2 w-6/7 bg-white h-full overflow-hidden flex flex-col">
        <div className="mb-2">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 flex-grow overflow-y-auto">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} addProduct={addProduct} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeDNavBar;
