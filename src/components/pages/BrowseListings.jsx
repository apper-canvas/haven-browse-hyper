import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { propertyService } from "@/services/api/propertyService";
import { toast } from "react-toastify";

const BrowseListings = () => {
  const { filters, searchTerm, updateFavoritesCount, setFilters, setSearchTerm } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadProperties();
  }, [filters, searchTerm]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");
      
      const searchFilters = searchTerm ? { ...filters, location: searchTerm } : filters;
      const data = await propertyService.getAll(searchFilters);
      const sortedData = sortBy ? propertyService.sortProperties(data, sortBy) : data;
      
      setProperties(sortedData);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    if (newSortBy) {
      const sortedProperties = propertyService.sortProperties(properties, newSortBy);
      setProperties([...sortedProperties]);
    }
  };

  const handleFavoriteToggle = async (updatedProperty) => {
    try {
      setProperties(prev => 
        prev.map(p => p.Id === updatedProperty.Id ? updatedProperty : p)
      );
      await updateFavoritesCount();
    } catch (error) {
      toast.error("Failed to update favorite");
      console.error("Error updating favorite:", error);
    }
  };

  const handleRetry = () => {
    loadProperties();
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setSortBy("");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorView message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="p-6">
        <Empty 
          title="No properties found"
          message="We couldn't find any properties matching your current search criteria. Try adjusting your filters or search location to discover more homes."
          actionText="Clear All Filters"
          onAction={handleClearFilters}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <PropertyGrid
        properties={properties}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onFavoriteToggle={handleFavoriteToggle}
        loading={loading}
      />
    </div>
  );
};

export default BrowseListings;