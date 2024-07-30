'use client';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        className="border p-2 flex-grow"
        placeholder="검색"
        onKeyDown={handleSearch}
        style={{ flexGrow: 1 }}
      />
      <button className="ml-2 p-2 bg-teal-500 text-white rounded">검색</button>
    </div>
  );
};

export default SearchBar;
