const ToggleButton = ({ isEnabled, setIsEnabled }) => {
    const toggle = () => setIsEnabled(!isEnabled);
  
    return (
      <div
        onClick={toggle}
        className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          isEnabled ? "bg-green-500" : ""
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
            isEnabled ? "translate-x-6" : ""
          }`}
        />
      </div>
    );
  };
  
  export default ToggleButton;
  