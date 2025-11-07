import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 animate-pulse"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Property Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
              
              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                {/* Price */}
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                
                {/* Address */}
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                </div>
                
                {/* Stats */}
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
    </div>
  );
};

export default Loading;