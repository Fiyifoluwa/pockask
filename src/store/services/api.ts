import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Category, ProductsResponse} from '../../types/api';

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

    getCategories: builder.query<Category[], void>({
      query: () => 'products/categories',
      providesTags: ['Category'],
    }),
  }),
});

export const {useGetProductsQuery, useGetCategoriesQuery} = api;
