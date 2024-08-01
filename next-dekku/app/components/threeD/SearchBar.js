'use client';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        className="border p-2 flex-grow"
        placeholder="검색"
        onChange={handleSearch}
        style={{ flexGrow: 1 }}
      />
    </div>
  );
};

export default SearchBar;
