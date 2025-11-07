import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyDetailComponent from "@/components/organisms/PropertyDetail";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
import { toast } from "react-toastify";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateFavoritesCount } = useOutletContext();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await propertyService.getById(parseInt(id));
      
      if (data) {
        setProperty(data);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      setError("Failed to load property details. Please try again.");
      console.error("Error loading property:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (propertyId) => {
    try {
      const updatedProperty = await propertyService.toggleFavorite(propertyId);
      if (updatedProperty) {
        setProperty(updatedProperty);
        await updateFavoritesCount();
        toast.success(
          updatedProperty.isFavorite 
            ? "Added to favorites!" 
            : "Removed from favorites",
          { autoClose: 2000 }
        );
      }
    } catch (error) {
      toast.error("Failed to update favorite");
      console.error("Error updating favorite:", error);
    }
  };

  const handleRetry = () => {
    loadProperty();
  };

  const handleBack = () => {
    navigate(-1);
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

  if (!property) {
    return (
      <div className="p-6">
        <ErrorView 
          message="Property not found" 
          onRetry={() => navigate("/")} 
        />
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
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-4"
      >
        <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
        Back to Listings
      </Button>

      {/* Property Detail Component */}
      <PropertyDetailComponent 
        property={property} 
        onFavoriteToggle={handleFavoriteToggle}
      />
    </motion.div>
  );
};

export default PropertyDetail;