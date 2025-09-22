// API Service for Sweet Shop App
// This file contains all API endpoints and service functions

const API_BASE_URL = 'https://api.sweetshop.com'; // Replace with your actual API URL

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  store: string;
  inStock: boolean;
  description?: string;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

// API Functions
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { name: string; email: string; password: string; phone: string }): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Products
  async getProducts(params?: { 
    category?: string; 
    search?: string; 
    page?: number; 
    limit?: number;
    sortBy?: 'price' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ products: Product[]; total: number; page: number }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/products?${queryParams.toString()}`);
  }

  async getProduct(id: string): Promise<Product> {
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.request('/products/featured');
  }

  async getRecommendedProducts(userId?: string): Promise<Product[]> {
    return this.request(`/products/recommended${userId ? `?userId=${userId}` : ''}`);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.request('/categories');
  }

  async getCategoryProducts(categoryId: string, params?: { page?: number; limit?: number }): Promise<{ products: Product[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/categories/${categoryId}/products?${queryParams.toString()}`);
  }

  // Stores
  async getStores(): Promise<Store[]> {
    return this.request('/stores');
  }

  async getStore(id: string): Promise<Store> {
    return this.request(`/stores/${id}`);
  }

  async getStoreProducts(storeId: string): Promise<Product[]> {
    return this.request(`/stores/${storeId}/products`);
  }

  // Cart
  async getCart(userId: string): Promise<CartItem[]> {
    return this.request(`/cart/${userId}`);
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<CartItem> {
    return this.request(`/cart/${userId}/add`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartItem> {
    return this.request(`/cart/${userId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    return this.request(`/cart/${userId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(userId: string): Promise<void> {
    return this.request(`/cart/${userId}/clear`, {
      method: 'DELETE',
    });
  }

  // Favorites
  async getFavorites(userId: string): Promise<Product[]> {
    return this.request(`/favorites/${userId}`);
  }

  async addToFavorites(userId: string, productId: string): Promise<void> {
    return this.request(`/favorites/${userId}/add`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromFavorites(userId: string, productId: string): Promise<void> {
    return this.request(`/favorites/${userId}/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  }

  // Orders
  async getOrders(userId: string): Promise<Order[]> {
    return this.request(`/orders/${userId}`);
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.request(`/orders/details/${orderId}`);
  }

  async createOrder(orderData: {
    userId: string;
    items: CartItem[];
    deliveryAddress: string;
    paymentMethod: string;
    specialInstructions?: string;
  }): Promise<Order> {
    return this.request('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async cancelOrder(orderId: string): Promise<void> {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
  }

  // Search
  async search(query: string, filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
  }): Promise<{
    products: Product[];
    stores: Store[];
    categories: Category[];
  }> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/search?${params.toString()}`);
  }

  // User Profile
  async getProfile(userId: string): Promise<User> {
    return this.request(`/users/${userId}`);
  }

  async updateProfile(userId: string, userData: Partial<User>): Promise<User> {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Addresses
  async getAddresses(userId: string): Promise<Array<{
    id: string;
    address: string;
    isDefault: boolean;
  }>> {
    return this.request(`/users/${userId}/addresses`);
  }

  async addAddress(userId: string, address: string, isDefault?: boolean): Promise<void> {
    return this.request(`/users/${userId}/addresses`, {
      method: 'POST',
      body: JSON.stringify({ address, isDefault }),
    });
  }

  // Reviews
  async getProductReviews(productId: string): Promise<Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>> {
    return this.request(`/products/${productId}/reviews`);
  }

  async addReview(productId: string, userId: string, rating: number, comment: string): Promise<void> {
    return this.request(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ userId, rating, comment }),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Mock data for development (remove when connecting to real API)
export const mockData = {
  products: [
    {
      id: '1',
      name: 'Fresh Organic Apples',
      price: 25.99,
      originalPrice: 29.99,
      image: '🍎',
      category: 'Groceries',
      rating: 4.5,
      store: 'Fresh Market',
      inStock: true,
      description: 'Premium quality organic apples, freshly picked from local orchards.',
    },
    // Add more mock products as needed
  ],
  categories: [
    {
      id: '1',
      name: 'Groceries',
      icon: 'local-grocery-store',
      color: '#4CAF50',
      itemCount: 1250,
    },
    // Add more mock categories as needed
  ],
  stores: [
    {
      id: '1',
      name: 'Fresh Market',
      image: '🏪',
      rating: 4.6,
      deliveryTime: '20-30 min',
    },
    // Add more mock stores as needed
  ],
};