import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Box, Text} from '../../../components';

interface EmptyStateProps {
  isLoading?: boolean;
  isError?: boolean;
  searchQuery?: string;
  selectedFilters?: string[];
  errorType?: 'products' | 'categories';
}

export const ProductListEmpty: React.FC<EmptyStateProps> = ({
  isLoading,
  isError,
  searchQuery,
  selectedFilters = [],
  errorType,
}) => {
  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        <ActivityIndicator size="large" />
        <Text variant="regular14" marginTop="m">
          Loading...
        </Text>
      </Box>
    );
  }

  if (isError) {
    const errorMessage =
      errorType === 'categories'
        ? 'Error loading categories. Please try again later.'
        : 'Error loading products. Please try again later.';

    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        <Text variant="headerText" textAlign="center" marginBottom="m">
          Oops!
        </Text>
        <Text variant="regular14" textAlign="center" color="ash200">
          {errorMessage}
        </Text>
      </Box>
    );
  }

  if (searchQuery || selectedFilters.length > 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        <Text variant="headerText" textAlign="center" marginBottom="m">
          No Results Found
        </Text>
        <Text variant="regular14" textAlign="center" color="ash200">
          {searchQuery && selectedFilters.length > 0
            ? `No products found matching "${searchQuery}" in the selected categories.`
            : searchQuery
            ? `No products found matching "${searchQuery}".`
            : 'No products found in the selected categories.'}
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
      <Text variant="headerText" textAlign="center" marginBottom="m">
        No Products Available
      </Text>
      <Text variant="regular14" textAlign="center" color="placeholderTextColor">
        Please check back later.
      </Text>
    </Box>
  );
};
