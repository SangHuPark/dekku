'use client';

const ProductCard = ({ name, description, image, modelPath, addProduct }) => {
  return (
    <div className="border p-2 rounded">
      <img src={image} alt={name} className="w-full h-50 mb-2" />
      <h3 className="text-lg">{name}</h3>
      <button
        className="mt-2 p-1 bg-blue-500 text-white rounded"
        onClick={() => addProduct({ name, modelPath, image, description })}
      >
        Add
      </button>
    </div>
  );
};

export default ProductCard;
