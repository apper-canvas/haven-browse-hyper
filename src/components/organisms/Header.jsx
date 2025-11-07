import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSearch, onToggleFilters, favoritesCount = 0 }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Browse Listings", href: "/", icon: "Home" },
    { name: "Map View", href: "/map", icon: "Map" },
    { name: "Favorites", href: "/favorites", icon: "Heart" }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-blue-700 p-2 rounded-lg shadow-md">
              <ApperIcon name="Home" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Haven Browse
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-gradient-to-r from-primary to-blue-700 text-white shadow-md"
                    : "text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                }`}
              >
                <ApperIcon name={item.icon} className="h-4 w-4 mr-2" />
                {item.name}
                {item.name === "Favorites" && favoritesCount > 0 && (
                  <span className="ml-1 bg-accent text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            ))}
            
            {/* Filters Toggle */}
            <button
              onClick={onToggleFilters}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
            >
              <ApperIcon name="SlidersHorizontal" className="h-4 w-4 mr-2" />
              Filters
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-gradient-to-r from-primary to-blue-700 text-white shadow-md"
                    : "text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                }`}
              >
                <ApperIcon name={item.icon} className="h-4 w-4 mr-3" />
                {item.name}
                {item.name === "Favorites" && favoritesCount > 0 && (
                  <span className="ml-auto bg-accent text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            ))}
            
            <button
              onClick={() => {
                onToggleFilters();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
            >
              <ApperIcon name="SlidersHorizontal" className="h-4 w-4 mr-3" />
              Filters
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;