import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  message = "Try adjusting your search filters to see more results.",
  actionText = "Clear Filters",
  onAction
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-background to-blue-50 p-8 rounded-xl">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary to-blue-400 rounded-full shadow-lg">
          <ApperIcon name="Home" className="h-10 w-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 font-body leading-relaxed">
          {message}
        </p>
        
        {onAction && actionText && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-orange-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;