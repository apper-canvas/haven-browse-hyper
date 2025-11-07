import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-blue-700 rounded-full shadow-lg">
          <ApperIcon name="HomeX" className="h-10 w-10 text-white" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-xl font-display font-semibold text-gray-700 mb-4">
          Property Not Found
        </h2>
        <p className="text-gray-600 font-body mb-8 leading-relaxed">
          Sorry, we couldn't find the property you're looking for. It might have been sold, 
          removed from the market, or the link might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full"
          >
            <ApperIcon name="Home" className="h-4 w-4 mr-2" />
            Browse All Properties
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 font-body mt-6">
          Need help? Try searching for properties by location or browse our featured listings.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;