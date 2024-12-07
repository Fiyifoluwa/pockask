/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {Product} from '../types/api';
import {
  fetchProducts,
  searchProducts,
  getProductsByCategory,
} from '../api/storeApi';
import {performanceUtils} from '../utils/performance';
import FastImage from 'react-native-fast-image';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterByCategory: (categoryId: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const useProducts = (initialLimit: number = 20): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = async (reset: boolean = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;
      const newProducts = await fetchProducts(newOffset, initialLimit);

      await performanceUtils.processInChunks(
        newProducts,
        async product => {
          if (product.images?.[0]) {
            FastImage.preload([{uri: product.images[0]}]);
          }
          return product;
        },
        5,
      );

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length === initialLimit);
      setOffset(newOffset + initialLimit);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const results = await searchProducts(query);
      setProducts(results);
      setHasMore(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const results = await getProductsByCategory(categoryId);
      setProducts(results);
      setHasMore(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore: () => loadProducts(false),
    searchProducts: handleSearch,
    filterByCategory: handleFilterByCategory,
    refreshProducts: () => loadProducts(true),
  };
};
