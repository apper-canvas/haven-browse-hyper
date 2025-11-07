import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { propertyService } from "@/services/api/propertyService";
import { toast } from "react-toastify";

const PropertyCard = ({ property, onFavoriteToggle }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      const updatedProperty = await propertyService.toggleFavorite(property.Id);
      if (updatedProperty) {
        onFavoriteToggle?.(updatedProperty);
        toast.success(
          updatedProperty.isFavorite 
            ? "Added to favorites!" 
            : "Removed from favorites",
          { autoClose: 2000 }
        );
      }
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  const formatPrice = (price) => {
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="accent" className="text-sm font-semibold shadow-md">
            {formatPrice(property.price)}
          </Badge>
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors duration-200 ${
            property.isFavorite
              ? "bg-accent text-white"
              : "bg-white text-gray-400 hover:text-accent"
          }`}
        >
          <ApperIcon 
            name="Heart" 
            className="h-4 w-4"
            fill={property.isFavorite ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="primary" className="text-xs">
            {property.status}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-display font-semibold text-gray-900 line-clamp-1">
          {property.title}
        </h3>

        {/* Address */}
        <div className="flex items-center text-gray-600 text-sm font-body">
          <ApperIcon name="MapPin" className="h-4 w-4 mr-1 text-gray-400" />
          <span className="line-clamp-1">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-body">
          <div className="flex items-center">
            <ApperIcon name="Bed" className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Bath" className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Square" className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-primary">
            {property.propertyType}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;