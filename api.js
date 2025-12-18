import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
  timeout: 10000,
});

export const getFilms = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    if (params.genre) {
      queryParams.append('genre', params.genre);
    }
    
    if (params.year) {
      queryParams.append('year', params.year);
    }
    
    if (params.rating) {
      queryParams.append('rating', params.rating);
    }
    
    if (params.quality) {
      queryParams.append('quality', params.quality);
      console.log('Adding quality filter:', params.quality);
    }
    
    const url = `/films${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('GET request URL:', `${API_BASE_URL}${url}`);
    console.log('Full query params:', queryParams.toString());
    const response = await apiClient.get(url);
    console.log('GET response status:', response.status);
    console.log('GET response data length:', response.data?.length);
    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    return [];
  }
};

export const getFilmById = async (id) => {
  try {
    const response = await apiClient.get(`/films/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching film with id ${id}:`, error);
    return null;
  }
};

export const getViewMore = async () => {
  try {
    console.log('Making GET request to /api/view-more...');
    const response = await apiClient.get('/view-more');
    console.log('View more response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching view more:', error);
    throw error;
  }
};

export const navHome = async () => {
  try {
    const response = await apiClient.get('/nav/home');
    console.log('Nav Home response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in nav home:', error);
    throw error;
  }
};

export const navCatalog = async () => {
  try {
    const response = await apiClient.get('/nav/catalog');
    console.log('Nav Catalog response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in nav catalog:', error);
    throw error;
  }
};

export const navCart = async () => {
  try {
    const response = await apiClient.get('/nav/cart');
    console.log('Nav Cart response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in nav cart:', error);
    throw error;
  }
};

export const getFilmDetails = async (id) => {
  try {
    const response = await apiClient.get(`/film-details/${id}`);
    console.log('Film details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching film details:', error);
    throw error;
  }
};

export const goBack = async () => {
  try {
    const response = await apiClient.get('/go-back');
    console.log('Go back response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in go back:', error);
    throw error;
  }
};

export const addToCart = async (filmId) => {
  try {
    const response = await apiClient.get(`/add-to-cart?filmId=${filmId}`);
    console.log('Add to cart response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const selectChange = async (field, value) => {
  try {
    const response = await apiClient.get(`/select-change?field=${field}&value=${value}`);
    console.log('Select change response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in select change:', error);
    throw error;
  }
};

export const quantityChange = async (action, filmId) => {
  try {
    const response = await apiClient.get(`/quantity-change?action=${action}&filmId=${filmId}`);
    console.log('Quantity change response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in quantity change:', error);
    throw error;
  }
};

export const featuresViewMore = async (action) => {
  try {
    const response = await apiClient.get(`/features-view-more?action=${action}`);
    console.log('Features view more response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in features view more:', error);
    throw error;
  }
};

export const cartRemove = async (filmId) => {
  try {
    const response = await apiClient.get(`/cart-remove?filmId=${filmId}`);
    console.log('Cart remove response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in cart remove:', error);
    throw error;
  }
};

export const cartIncrease = async (filmId) => {
  try {
    const response = await apiClient.get(`/cart-increase?filmId=${filmId}`);
    console.log('Cart increase response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in cart increase:', error);
    throw error;
  }
};

export const cartDecrease = async (filmId) => {
  try {
    const response = await apiClient.get(`/cart-decrease?filmId=${filmId}`);
    console.log('Cart decrease response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in cart decrease:', error);
    throw error;
  }
};

export const cartClear = async () => {
  try {
    const response = await apiClient.get('/cart-clear');
    console.log('Cart clear response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in cart clear:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in login:', error);
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Помилка входу';
      if (status === 401) {
        return { success: false, message: 'Невірний email або пароль' };
      }
      if (status === 400) {
        return { success: false, message: message };
      }
    }
    return { success: false, message: 'Помилка входу' };
  }
};

export const register = async (email, password, firstName, lastName) => {
  try {
    const response = await apiClient.post('/register', { email, password, firstName, lastName });
    console.log('Register response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in register:', error);
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Помилка реєстрації';
      if (status === 409) {
        return { success: false, message: 'Користувач з таким email вже існує' };
      }
      if (status === 400) {
        return { success: false, message: message };
      }
    }
    return { success: false, message: 'Помилка реєстрації' };
  }
};

export default apiClient;

