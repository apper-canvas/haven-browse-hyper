import React from "react";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const SortDropdown = ({ sortBy, onSortChange, className }) => {
  const sortOptions = [
    { value: "", label: "Sort by" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest Listed" },
    { value: "sqft", label: "Square Feet" },
    { value: "bedrooms", label: "Most Bedrooms" }
  ];

  return (
    <div className={`relative ${className}`}>
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none pr-10"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
      />
    </div>
  );
};

export default SortDropdown;