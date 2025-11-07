import React from "react";

const FilterRange = ({ 
  label, 
  min, 
  max, 
  value = [min, max], 
  onChange, 
  step = 1,
  formatValue = (val) => val.toLocaleString()
}) => {
  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 font-body">
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600 font-body">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            step={step}
            onChange={handleMinChange}
            className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #7BA8C4 0%, #7BA8C4 ${((value[0] - min) / (max - min)) * 100}%, #e5e7eb ${((value[0] - min) / (max - min)) * 100}%, #e5e7eb 100%)`
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            step={step}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${((value[1] - min) / (max - min)) * 100}%, #7BA8C4 ${((value[1] - min) / (max - min)) * 100}%, #7BA8C4 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterRange;