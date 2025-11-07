import React from "react";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-background to-red-50 p-8 rounded-xl">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full shadow-lg">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 font-body">
          {message}. Please try again or contact support if the problem persists.
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;