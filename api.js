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
    
    const url = `/films${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('GET request URL:', `${API_BASE_URL}${url}`);
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

export default apiClient;

