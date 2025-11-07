import propertiesData from "@/services/mockData/properties.json";

class PropertyService {
  constructor() {
    this.properties = [...propertiesData];
    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = localStorage.getItem("haven-browse-favorites");
    if (favorites) {
      const favoriteIds = JSON.parse(favorites);
      this.properties = this.properties.map(property => ({
        ...property,
        isFavorite: favoriteIds.includes(property.Id)
      }));
    }
  }

  saveFavorites() {
    const favoriteIds = this.properties
      .filter(property => property.isFavorite)
      .map(property => property.Id);
    localStorage.setItem("haven-browse-favorites", JSON.stringify(favoriteIds));
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(filters = {}) {
    await this.delay();
    
    let filteredProperties = [...this.properties];

    if (filters.priceMin !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.priceMax);
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filters.propertyType.includes(p.propertyType)
      );
    }

    if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms !== undefined && filters.bathrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathrooms);
    }

    if (filters.squareFeetMin !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.squareFeet >= filters.squareFeetMin);
    }

    if (filters.squareFeetMax !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.squareFeet <= filters.squareFeetMax);
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredProperties = filteredProperties.filter(p => 
        p.city.toLowerCase().includes(location) ||
        p.state.toLowerCase().includes(location) ||
        p.address.toLowerCase().includes(location) ||
        p.zipCode.includes(location)
      );
    }

    return filteredProperties;
  }

  async getById(id) {
    await this.delay();
    const property = this.properties.find(p => p.Id === parseInt(id));
    return property ? { ...property } : null;
  }

  async toggleFavorite(id) {
    await this.delay(200);
    const propertyIndex = this.properties.findIndex(p => p.Id === parseInt(id));
    
    if (propertyIndex !== -1) {
      this.properties[propertyIndex].isFavorite = !this.properties[propertyIndex].isFavorite;
      this.saveFavorites();
      return { ...this.properties[propertyIndex] };
    }
    
    return null;
  }

  async getFavorites() {
    await this.delay();
    return this.properties.filter(property => property.isFavorite);
  }

  sortProperties(properties, sortBy) {
    const sortedProperties = [...properties];
    
    switch (sortBy) {
      case "price-low":
        return sortedProperties.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProperties.sort((a, b) => b.price - a.price);
      case "newest":
        return sortedProperties.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
      case "sqft":
        return sortedProperties.sort((a, b) => b.squareFeet - a.squareFeet);
      case "bedrooms":
        return sortedProperties.sort((a, b) => b.bedrooms - a.bedrooms);
      default:
        return sortedProperties;
    }
  }
}

export const propertyService = new PropertyService();