import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { propertyService } from "@/services/api/propertyService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";

// Create custom icon for property markers
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
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
<div className="flex-1 relative h-full">
        {/* Interactive Map */}
        <div className="h-full w-full">
          <MapContainer
            center={[39.8283, -98.5795]} // Center of United States
            zoom={4}
            className="h-full w-full rounded-none"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Property Markers */}
            {properties.map((property, index) => {
              // Generate coordinates if not available (for demo purposes)
              const lat = property.latitude || (32 + Math.random() * 15); // Fallback coordinates
              const lng = property.longitude || (-120 + Math.random() * 40);
              
              return (
                <Marker
                  key={property.Id}
                  position={[lat, lng]}
                  icon={customIcon}
                >
                  <Popup className="custom-popup">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 max-w-xs"
                    >
                      {/* Property Image */}
                      <div className="mb-3 aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80';
                          }}
                        />
                      </div>
                      
                      {/* Property Details */}
                      <div className="space-y-2">
                        <h3 className="font-display font-semibold text-gray-900 text-sm">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="accent" className="text-xs">
                            {formatPrice(property.price)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {property.propertyType}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-600">
                          <ApperIcon name="MapPin" className="h-3 w-3 mr-1" />
                          {property.city}, {property.state}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
                          <span>{property.sqft} sqft</span>
                        </div>
                        
                        <Button
                          size="sm"
                          className="w-full mt-3 text-xs"
                          onClick={() => window.location.href = `/property/${property.Id}`}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
</div>
  );
};

export default MapView;