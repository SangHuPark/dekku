import { v4 as uuidv4 } from 'uuid';

// ProductCard 컴포넌트 정의
const ProductCard = ({ name, description, image, modelPath, scale, price, addProduct, small }) => {
  // 클릭 시 호출되는 핸들러 함수
  const handleClick = () => {
    const uniqueId = uuidv4(); // 고유한 uniqueId 생성
    addProduct && addProduct({ uniqueId, name, modelPath, image, description, price, scale }); // 제품 추가 함수 호출
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-between transition-transform duration-200 hover:scale-105 cursor-pointer ${
        small ? 'w-32 h-44' : 'w-40 h-55'
      }`}
      onClick={handleClick} // 클릭 시 handleClick 함수 호출
    >
      <div className={`flex items-center justify-center mb-2 ${small ? 'w-24 h-24' : 'w-30 h-30'}`}>
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>
      <div className="text-center px-2">
        <p className="text-xs mb-1 truncate" style={{ fontSize: '12px' }}>{name}</p>
        <p className="text-xs text-gray-500 truncate" style={{ fontSize: '12px' }}>{description}</p>
        <p className="text-xs text-gray-700" style={{ fontSize: '12px' }}>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
