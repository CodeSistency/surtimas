import React, { useState } from "react";
import { SketchPicker, CirclePicker } from "react-color";

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(true);

  const handleColorChange = (selectedColor) => {
    onChange(selectedColor);
    
  };

  return (
    <div style={{display: 'flex', marginTop: '1rem'}}>
      Color:
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "2px",
          backgroundColor: color,
          cursor: "pointer",
          border: "1px solid black",
          marginLeft: '5px',
          marginRight: '7px'
        }}
        onClick={() => setShowPicker(!showPicker)}
      />
      
      {showPicker && (
        <SketchPicker
          color={color}
          onChangeComplete={(color) => handleColorChange(color.hex)}
        />
      )}
    </div>
  );
};

export default ColorPicker;