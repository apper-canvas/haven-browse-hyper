import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { propertyService } from "@/services/api/propertyService";
import { toast } from "react-toastify";

const Favorites = () => {
  const { updateFavoritesCount } = useOutletContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await propertyService.getFavorites();
      const sortedData = sortBy ? propertyService.sortProperties(data, sortBy) : data;
      
      setFavorites(sortedData);
    } catch (err) {
      setError("Failed to load favorite properties. Please try again.");
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    if (newSortBy) {
      const sortedFavorites = propertyService.sortProperties(favorites, newSortBy);
      setFavorites([...sortedFavorites]);
    }
  };

  const handleFavoriteToggle = async (updatedProperty) => {
    try {
      if (!updatedProperty.isFavorite) {
        // Property was removed from favorites, remove from list
        setFavorites(prev => prev.filter(p => p.Id !== updatedProperty.Id));
        toast.success("Removed from favorites", { autoClose: 2000 });
      } else {
        // Property was added to favorites, update in list
        setFavorites(prev => 
          prev.map(p => p.Id === updatedProperty.Id ? updatedProperty : p)
        );
        toast.success("Added to favorites!", { autoClose: 2000 });
      }
      
      await updateFavoritesCount();
    } catch (error) {
      toast.error("Failed to update favorite");
      console.error("Error updating favorite:", error);
    }
  };

  const handleRetry = () => {
    loadFavorites();
  };

  const handleBrowseProperties = () => {
    window.location.href = "/";
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

  if (favorites.length === 0) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Empty 
            title="No favorite properties yet"
            message="Start exploring properties and click the heart icon to save your favorites. This will make it easy to compare and revisit properties you love."
            actionText="Browse Properties"
            onAction={handleBrowseProperties}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-accent to-orange-600 p-3 rounded-lg shadow-md">
            <ApperIcon name="Heart" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              My Favorites
            </h1>
            <p className="text-gray-600 font-body">
              {favorites.length} saved {favorites.length === 1 ? "property" : "properties"}
            </p>
          </div>
        </div>

        <Button
          onClick={handleBrowseProperties}
          variant="outline"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add More
        </Button>
      </div>

      {/* Properties Grid */}
      <PropertyGrid
        properties={favorites}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onFavoriteToggle={handleFavoriteToggle}
        loading={loading}
      />
    </motion.div>
  );
};

export default Favorites;