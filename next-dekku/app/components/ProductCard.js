'use client';

const ProductCard = ({ name, description, image, modelPath, addProduct }) => {
  return (
    <div
      className="border p-2 rounded w-40 h-56 relative flex flex-col items-center justify-between transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => addProduct({ name, modelPath, image, description })}
    >
      <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2">
        {image ? (
          <img src={image} alt={name} className="object-cover h-full w-full" /> 
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>
      <h3 className="text-sm mb-2 text-center">{name}</h3> 
    </div>
  );
};

export default ProductCard;
