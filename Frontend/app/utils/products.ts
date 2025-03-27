// Product Interfaces
export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
}

export interface Computer extends BaseProduct {
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
}

export interface Smartphone extends BaseProduct {
  screenSize: string;
  storage: string;
  camera: string;
  battery: string;
  brand?: string;
}

export interface TvMonitor extends BaseProduct {
  screenSize: string;
  resolution: string;
  refreshRate: string;
  connectivity: string[];
}

export interface GamingEquipment extends BaseProduct {
  type: "Console" | "Controller" | "Accessory";
  compatibility: string[];
  features: string[];
}

export interface Headphone extends BaseProduct {
  type: "Wireless" | "Wired";
  connectivity: string[];
  features: string[];
}

export interface Speaker extends BaseProduct {
  type: "Portable" | "Home" | "Professional";
  power: string;
  connectivity: string[];
}

export interface Accessory extends BaseProduct {
  compatibleWith: string[];
  type: string;
}

// API base URL
const API_BASE_URL = "http://localhost:3002";

// Helper function to get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Helper function to get products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} products`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
};

// Helper function to get a single product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Helper function to search products
export const searchProducts = async (query: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

// Helper function to create a new product
export interface CreateProductData {
  quantity: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
  reviewDetails?: any[];
}

export const createProduct = async (productData: CreateProductData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
