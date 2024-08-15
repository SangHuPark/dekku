import { v4 as uuidv4 } from 'uuid';

// ProductCard 컴포넌트 정의
const ProductCard = ({ id, name, description, imageUrl, modelPath, scale, price, addProduct, small }) => {
  // 클릭 시 호출되는 핸들러 함수
  const handleClick = () => {
    const uniqueId = uuidv4(); // 고유한 uniqueId 생성
    addProduct && addProduct({ id, uniqueId, name, description, imageUrl, modelPath, scale, price  }); // 제품 추가 함수 호출
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-between transition-transform duration-200 hover:scale-105 cursor-pointer ${
        small ? 'w-32 h-44' : 'w-40 h-55'
      }`}
      onClick={handleClick} // 클릭 시 handleClick 함수 호출
    >
      <div className={`flex items-center justify-center mb-1 ${small ? 'w-24 h-24' : 'w-30 h-30'}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="object-fill w-full h-70rem" />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>
      <div className="text-center px-2 py-3">
        <p className="text-xs mb-1 truncate" style={{ fontSize: '12px' }}>{name}</p>
        <p className="text-xs text-gray-500 truncate" style={{ fontSize: '12px' }}>{description}</p>
        <p className="text-xs text-gray-700" style={{ fontSize: '12px' }}>{price}원</p>
      </div>
    </div>
  );
};

export default ProductCard;
