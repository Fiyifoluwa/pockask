import axios from 'axios';
import {Product, Category} from '../types/api';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (
  offset: number = 0,
  limit: number = 20,
): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(
      `/products?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products/?title=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryId: number,
): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(
      `/categories/${categoryId}/products`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};
