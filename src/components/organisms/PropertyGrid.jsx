import React from "react";
import { motion } from "framer-motion";
import PropertyCard from "@/components/molecules/PropertyCard";
import SortDropdown from "@/components/molecules/SortDropdown";
import ApperIcon from "@/components/ApperIcon";

const PropertyGrid = ({ 
  properties, 
  sortBy, 
  onSortChange, 
  onFavoriteToggle, 
  loading = false 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Home" className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Properties ({properties.length})
          </h1>
        </div>
        
        <SortDropdown
          sortBy={sortBy}
          onSortChange={onSortChange}
          className="w-full sm:w-48"
        />
      </div>

      {/* Properties Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {properties.map((property) => (
          <motion.div key={property.Id} variants={itemVariants}>
            <PropertyCard 
              property={property} 
              onFavoriteToggle={onFavoriteToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;