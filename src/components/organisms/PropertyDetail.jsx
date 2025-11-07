import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const PropertyDetail = ({ property, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = async () => {
    if (onFavoriteToggle) {
      await onFavoriteToggle(property.Id);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-96 lg:h-[500px]">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gallery Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ApperIcon name="ChevronLeft" className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ApperIcon name="ChevronRight" className="h-6 w-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        )}

        {/* Price and Favorite */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge variant="accent" className="text-lg font-bold shadow-lg">
            {formatPrice(property.price)}
          </Badge>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
            onClick={handleFavoriteClick}
            className={`p-3 rounded-full shadow-lg transition-colors duration-200 ${
              property.isFavorite
                ? "bg-accent text-white"
                : "bg-white text-gray-400 hover:text-accent"
            }`}
          >
            <ApperIcon 
              name="Heart" 
              className="h-6 w-6"
              fill={property.isFavorite ? "currentColor" : "none"}
            />
          </motion.button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              {property.title}
            </h1>
            <Badge variant="primary">{property.status}</Badge>
          </div>
          
          <div className="flex items-center text-gray-600">
            <ApperIcon name="MapPin" className="h-5 w-5 mr-2 text-gray-400" />
            <span className="font-body">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Bed" className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.bedrooms}
            </div>
            <div className="text-sm text-gray-600 font-body">Bedrooms</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Bath" className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.bathrooms}
            </div>
            <div className="text-sm text-gray-600 font-body">Bathrooms</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Square" className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.squareFeet.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-body">Sq Ft</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Calendar" className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.yearBuilt}
            </div>
            <div className="text-sm text-gray-600 font-body">Built</div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">
            Description
          </h2>
          <p className="text-gray-700 font-body leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">
            Key Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
              >
                <ApperIcon name="Check" className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                <span className="text-sm font-body text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">
            Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
              >
                <ApperIcon name="Star" className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                <span className="text-sm font-body text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">
            Property Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
            <div className="flex justify-between">
              <span className="text-gray-600">Property Type:</span>
              <span className="font-medium text-gray-900">{property.propertyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lot Size:</span>
              <span className="font-medium text-gray-900">
                {property.lotSize > 0 ? `${property.lotSize.toLocaleString()} sqft` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Built:</span>
              <span className="font-medium text-gray-900">{property.yearBuilt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Listed:</span>
              <span className="font-medium text-gray-900">{formatDate(property.listedDate)}</span>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <Button size="lg" className="flex-1">
            <ApperIcon name="Phone" className="h-5 w-5 mr-2" />
            Contact Agent
          </Button>
          <Button variant="secondary" size="lg" className="flex-1">
            <ApperIcon name="Calendar" className="h-5 w-5 mr-2" />
            Schedule Tour
          </Button>
          <Button variant="outline" size="lg">
            <ApperIcon name="Share2" className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {property.images.length > 1 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  currentImageIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:opacity-75"
                }`}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;