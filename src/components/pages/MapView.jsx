import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { propertyService } from "@/services/api/propertyService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Load properties data on component mount
  useEffect(() => {
    loadProperties();
  }, [filters, searchTerm]);
const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");
      
      const searchFilters = searchTerm ? { ...filters, location: searchTerm } : filters;
      const data = await propertyService.getAll(searchFilters);
      
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadProperties();
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return "Price not available";
    return `$${(price / 1000).toFixed(0)}K`;
  };
// Handle loading state
  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <ErrorView 
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Handle empty state

if (properties.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Empty 
          title="No Properties Available"
          description="We couldn't find any properties matching your current search criteria. Try adjusting your filters or search location to discover more homes."
          action={
            <Button onClick={handleClearFilters}>
              <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Map" className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Map View
            </h1>
            <Badge variant="secondary" className="ml-2">
              {properties.length} properties
            </Badge>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 opacity-50"></div>
        
        {/* Map Content */}
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4"
          >
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-blue-700 rounded-full shadow-lg">
              <ApperIcon name="MapPin" className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-3">
              Interactive Map Coming Soon
            </h2>
            
            <p className="text-gray-600 font-body mb-6 leading-relaxed">
              We're working on an interactive map that will show all {properties.length} properties with clickable markers and detailed previews. 
              For now, you can browse properties in the grid view.
            </p>

            {/* Property Locations Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Properties by Location:
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {properties.slice(0, 5).map((property) => (
                  <div key={property.Id} className="flex items-center justify-between">
                    <span className="text-gray-600 font-body">
                      {property.city}, {property.state}
                    </span>
                    <Badge variant="accent" className="text-xs">
                      {formatPrice(property.price)}
                    </Badge>
                  </div>
                ))}
                {properties.length > 5 && (
                  <div className="text-gray-500 text-xs mt-2">
                    +{properties.length - 5} more properties
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => window.location.href = "/"}
              className="w-full"
            >
              <ApperIcon name="Grid3x3" className="h-4 w-4 mr-2" />
              Browse Grid View
            </Button>
          </motion.div>
        </div>

        {/* Mock Map Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {properties.slice(0, 8).map((property, index) => (
            <motion.div
              key={property.Id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="absolute"
              style={{
                left: `${20 + (index % 4) * 15}%`,
                top: `${30 + Math.floor(index / 4) * 20}%`,
              }}
            >
              <div className="bg-accent text-white px-2 py-1 rounded-full shadow-lg text-xs font-medium">
                {formatPrice(property.price)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
</div>
  );
};

export default MapView;