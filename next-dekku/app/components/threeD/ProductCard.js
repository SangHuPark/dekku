'use client';

const ProductCard = ({ name, description, image, modelPath, scale, price, addProduct }) => {
  return (
    <div
      className="w-132 h-196 relative flex flex-col items-center justify-between transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => addProduct({ name, modelPath, image, description, price, scale })}
    >
      <div className="w-32 h-32 flex items-center justify-center mb-2">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-auto" /> 
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>
      <div className="text-center">
        <p className="text-xs mb-1" style={{ fontSize: '12px' }}>{name}</p> 
        <p className="text-xs text-gray-500" style={{ fontSize: '12px' }}>{description}</p>
        <p className="text-xs text-gray-700" style={{ fontSize: '12px' }}>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
