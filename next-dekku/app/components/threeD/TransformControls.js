import React from "react";

const TransformControls = ({ activeModel, onRotateChange, onHeightChange }) => {
  const handleRotateChange = (event) => {
    const rotationY = event.target.value;
    onRotateChange(rotationY);
  };

  const handleHeightChange = (event) => {
    const height = parseFloat(event.target.value);
    onHeightChange(height);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "4px",
        right: "10px",
        backgroundColor: "white",
        padding: "3px",
        borderRadius: "5px",
        zIndex: 10,
      }}
    >
      <label>회전: </label>
      <input
        type="range"
        min="0"
        max="360"
        value={activeModel ? activeModel.rotation.y * (180 / Math.PI) : 0}
        onChange={handleRotateChange}
      />
      <span>
        {activeModel
          ? (activeModel.rotation.y * (180 / Math.PI)).toFixed(2)
          : 0}
        °
      </span>
      <br />
      <label>높이: </label>
      <input
        type="range"
        min="2.18"
        max="4"
        step="0.01"
        value={activeModel ? activeModel.position.y : 0}
        onChange={handleHeightChange}
      />
      <span>{activeModel ? activeModel.position.y.toFixed(2) : 0}</span>
    </div>
  );
};

export default TransformControls;
