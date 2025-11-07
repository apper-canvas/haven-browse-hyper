import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import { propertyService } from "@/services/api/propertyService";

const Layout = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);

  useEffect(() => {
    updateFavoritesCount();
    updatePropertiesCount();
  }, []);

  useEffect(() => {
    updatePropertiesCount();
  }, [filters, searchTerm]);

  const updateFavoritesCount = async () => {
    try {
      const favorites = await propertyService.getFavorites();
      setFavoritesCount(favorites.length);
    } catch (error) {
      console.error("Failed to update favorites count:", error);
    }
  };

  const updatePropertiesCount = async () => {
    try {
      const searchFilters = searchTerm ? { ...filters, location: searchTerm } : filters;
      const properties = await propertyService.getAll(searchFilters);
      setPropertiesCount(properties.length);
    } catch (error) {
      console.error("Failed to update properties count:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onToggleFilters={handleToggleFilters}
        favoritesCount={favoritesCount}
      />
      
      <div className="flex">
        <FilterSidebar
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          propertiesCount={propertiesCount}
        />
        
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <Outlet context={{ 
            filters, 
            searchTerm, 
            updateFavoritesCount,
            setFilters: handleFiltersChange,
            setSearchTerm: handleSearch
          }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;