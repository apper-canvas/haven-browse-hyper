import { getApperClient } from "@/services/apperClient";

class PropertyService {
  constructor() {
    this.tableName = 'property_c';
    // Field mapping from mock data to database fields
    this.fieldMap = {
      'Id': 'Id',
      'title': 'title_c',
      'price': 'price_c',
      'address': 'address_c',
      'city': 'city_c',
      'state': 'state_c',
      'zipCode': 'zip_code_c',
      'propertyType': 'property_type_c',
      'bedrooms': 'bedrooms_c',
      'bathrooms': 'bathrooms_c',
      'squareFeet': 'square_feet_c',
      'lotSize': 'lot_size_c',
      'yearBuilt': 'year_built_c',
      'description': 'description_c',
      'features': 'features_c',
      'amenities': 'amenities_c',
      'images': 'images_c',
      'coordinates': 'coordinates_c',
      'status': 'status_c',
      'listedDate': 'listed_date_c',
      'isFavorite': 'is_favorite_c'
    };
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  transformToMockFormat(dbRecord) {
    const mockRecord = {
      Id: dbRecord.Id,
      title: dbRecord.title_c || '',
      price: dbRecord.price_c || 0,
      address: dbRecord.address_c || '',
      city: dbRecord.city_c || '',
      state: dbRecord.state_c || '',
      zipCode: dbRecord.zip_code_c || '',
      propertyType: dbRecord.property_type_c || '',
      bedrooms: dbRecord.bedrooms_c || 0,
      bathrooms: dbRecord.bathrooms_c || 0,
      squareFeet: dbRecord.square_feet_c || 0,
      lotSize: dbRecord.lot_size_c || 0,
      yearBuilt: dbRecord.year_built_c || 0,
      description: dbRecord.description_c || '',
      features: dbRecord.features_c ? JSON.parse(dbRecord.features_c) : [],
      amenities: dbRecord.amenities_c ? JSON.parse(dbRecord.amenities_c) : [],
      images: dbRecord.images_c ? JSON.parse(dbRecord.images_c) : [],
      coordinates: dbRecord.coordinates_c ? JSON.parse(dbRecord.coordinates_c) : { lat: 0, lng: 0 },
      status: dbRecord.status_c || 'For Sale',
      listedDate: dbRecord.listed_date_c || '',
      isFavorite: dbRecord.is_favorite_c || false
    };
    return mockRecord;
  }

  transformToDbFormat(mockRecord) {
    const dbRecord = {
      title_c: mockRecord.title,
      price_c: mockRecord.price,
      address_c: mockRecord.address,
      city_c: mockRecord.city,
      state_c: mockRecord.state,
      zip_code_c: mockRecord.zipCode,
      property_type_c: mockRecord.propertyType,
      bedrooms_c: mockRecord.bedrooms,
      bathrooms_c: mockRecord.bathrooms,
      square_feet_c: mockRecord.squareFeet,
      lot_size_c: mockRecord.lotSize,
      year_built_c: mockRecord.yearBuilt,
      description_c: mockRecord.description,
      features_c: JSON.stringify(mockRecord.features || []),
      amenities_c: JSON.stringify(mockRecord.amenities || []),
      images_c: JSON.stringify(mockRecord.images || []),
      coordinates_c: JSON.stringify(mockRecord.coordinates || { lat: 0, lng: 0 }),
      status_c: mockRecord.status,
      listed_date_c: mockRecord.listedDate,
      is_favorite_c: mockRecord.isFavorite || false
    };
    return dbRecord;
  }

  async getAll(filters = {}) {
    await this.delay();
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return [];
      }

      // Build where conditions based on filters
      const whereConditions = [];
      
      if (filters.priceMin !== undefined) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.priceMin.toString()],
          Include: true
        });
      }
      
      if (filters.priceMax !== undefined) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "LessThanOrEqualTo",
          Values: [filters.priceMax.toString()],
          Include: true
        });
      }
      
      if (filters.propertyType && filters.propertyType.length > 0) {
        whereConditions.push({
          FieldName: "property_type_c",
          Operator: "ExactMatch",
          Values: filters.propertyType,
          Include: true
        });
      }
      
      if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
        whereConditions.push({
          FieldName: "bedrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.bedrooms.toString()],
          Include: true
        });
      }
      
      if (filters.bathrooms !== undefined && filters.bathrooms > 0) {
        whereConditions.push({
          FieldName: "bathrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.bathrooms.toString()],
          Include: true
        });
      }
      
      if (filters.squareFeetMin !== undefined) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.squareFeetMin.toString()],
          Include: true
        });
      }
      
      if (filters.squareFeetMax !== undefined) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "LessThanOrEqualTo",
          Values: [filters.squareFeetMax.toString()],
          Include: true
        });
      }

      // Location search across multiple fields
      if (filters.location) {
        const locationConditions = [];
        const location = filters.location.toLowerCase();
        
        locationConditions.push({
          fieldName: "city_c",
          operator: "Contains",
          values: [location]
        });
        
        locationConditions.push({
          fieldName: "state_c",
          operator: "Contains",
          values: [location]
        });
        
        locationConditions.push({
          fieldName: "address_c",
          operator: "Contains",
          values: [location]
        });
        
        locationConditions.push({
          fieldName: "zip_code_c",
          operator: "Contains",
          values: [location]
        });

        whereConditions.push({
          operator: "OR",
          subGroups: [{
            conditions: locationConditions,
            operator: "OR"
          }]
        });
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "coordinates_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "is_favorite_c"}}
        ],
        where: whereConditions.filter(condition => !condition.operator), // Simple conditions
        whereGroups: whereConditions.filter(condition => condition.operator), // Complex conditions
        orderBy: [{"fieldName": "listed_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error fetching properties:", response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Transform database records to mock format
      return response.data.map(record => this.transformToMockFormat(record));
      
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getById(id) {
    await this.delay();
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return null;
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "coordinates_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "is_favorite_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(`Error fetching property ${id}:`, response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      // Transform database record to mock format
      return this.transformToMockFormat(response.data);
      
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error.message);
      return null;
    }
  }

  async toggleFavorite(id) {
    await this.delay(200);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return null;
      }

      // First get current property to toggle favorite status
      const currentProperty = await this.getById(id);
      if (!currentProperty) {
        return null;
      }

      const newFavoriteStatus = !currentProperty.isFavorite;
      
      const params = {
        records: [{
          Id: parseInt(id),
          is_favorite_c: newFavoriteStatus
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error toggling favorite:", response.message);
        return null;
      }

      // Return updated property
      return {
        ...currentProperty,
        isFavorite: newFavoriteStatus
      };
      
    } catch (error) {
      console.error("Error toggling favorite:", error?.response?.data?.message || error.message);
      return null;
    }
  }

  async getFavorites() {
    await this.delay();
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return [];
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "coordinates_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "is_favorite_c"}}
        ],
        where: [{
          FieldName: "is_favorite_c",
          Operator: "ExactMatch",
          Values: ["true"],
          Include: true
        }],
        orderBy: [{"fieldName": "listed_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error fetching favorites:", response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Transform database records to mock format
      return response.data.map(record => this.transformToMockFormat(record));
      
    } catch (error) {
      console.error("Error fetching favorites:", error?.response?.data?.message || error.message);
      return [];
    }
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