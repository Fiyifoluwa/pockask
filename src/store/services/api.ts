import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Product, ProductsResponse} from '../../types/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: builder => ({
    getProducts: builder.query<
      ProductsResponse,
      {skip?: number; limit?: number}
    >({
      query: ({skip = 0, limit = 20}) => ({
        url: 'products',
        params: {skip, limit},
      }),
      providesTags: ['Product'],
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache && newItems.skip > 0) {
          return {
            ...newItems,
            products: [...currentCache.products, ...newItems.products],
          };
        }
        return newItems;
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.skip !== previousArg?.skip;
      },
    }),

    getProductById: builder.query<Product, number>({
      query: id => `products/${id}`,
      providesTags: (_result, _error, id) => [{type: 'Product', id}],
    }),

    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Category'],
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: query => ({
        url: 'products/search',
        params: {q: query},
      }),
      providesTags: ['Product'],
    }),

    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: category => `products/category/${category}`,
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = api;
