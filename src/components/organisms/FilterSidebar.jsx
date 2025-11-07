import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FilterRange from "@/components/molecules/FilterRange";
import Select from "@/components/atoms/Select";

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onClearFilters,
  propertiesCount 
}) => {
  const propertyTypes = ["House", "Condo", "Townhouse"];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = filters.propertyType || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleFilterChange("propertyType", updatedTypes);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed lg:static inset-y-0 left-0 w-80 bg-white shadow-xl lg:shadow-lg border-r border-gray-100 z-50 lg:z-0 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-semibold text-gray-900">
                    Filters
                  </h2>
                  <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>

                {/* Results Count */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                  <p className="text-sm font-body text-gray-600">
                    <span className="font-semibold text-primary">{propertiesCount}</span> properties found
                  </p>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <FilterRange
                    label="Price Range"
                    min={300000}
                    max={3000000}
                    step={50000}
                    value={[filters.priceMin || 300000, filters.priceMax || 3000000]}
                    onChange={([min, max]) => {
                      handleFilterChange("priceMin", min);
                      handleFilterChange("priceMax", max);
                    }}
                    formatValue={(val) => `$${(val / 1000).toFixed(0)}K`}
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 font-body">
                    Property Type
                  </label>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(filters.propertyType || []).includes(type)}
                          onChange={() => handlePropertyTypeToggle(type)}
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-700 font-body">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 font-body">
                    Minimum Bedrooms
                  </label>
                  <Select
                    value={filters.bedrooms || ""}
                    onChange={(e) => handleFilterChange("bedrooms", e.target.value ? parseInt(e.target.value) : undefined)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 font-body">
                    Minimum Bathrooms
                  </label>
                  <Select
                    value={filters.bathrooms || ""}
                    onChange={(e) => handleFilterChange("bathrooms", e.target.value ? parseInt(e.target.value) : undefined)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </Select>
                </div>

                {/* Square Feet */}
                <div className="space-y-4">
                  <FilterRange
                    label="Square Feet"
                    min={500}
                    max={5000}
                    step={100}
                    value={[filters.squareFeetMin || 500, filters.squareFeetMax || 5000]}
                    onChange={([min, max]) => {
                      handleFilterChange("squareFeetMin", min);
                      handleFilterChange("squareFeetMax", max);
                    }}
                    formatValue={(val) => `${val.toLocaleString()} sqft`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={onClearFilters}
                    variant="outline"
                    className="w-full"
                  >
                    <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    className="w-full lg:hidden"
                  >
                    View {propertiesCount} Properties
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;