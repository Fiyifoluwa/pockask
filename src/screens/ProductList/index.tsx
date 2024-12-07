/* eslint-disable react/no-unstable-nested-components */
import React, {useMemo, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {useGetProductsQuery} from '../../store/services/api';
import {ProductListScreenProps} from '../../navigation/types';
import LayoutContainer from '../../components/LayoutContainer';
import Box from '../../components/Box';
import Text from '../../components/Text';
import {ProductCard} from './components/ProductCard';
import {Product} from '../../types/api';
import {ProductListHeader} from './components/ProductListHeader';

export const ProductList: React.FC<ProductListScreenProps> = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('desc');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const {data, isLoading, isFetching, error} = useGetProductsQuery({
    limit: 20,
    skip: page * 20,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPage(0);
  };

  const handleFilter = () => {
    setFilterModalVisible(true);
  };

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleApplyFilters = (filters: string[]) => {
    setSelectedFilters(filters);
    setPage(0);
  };

  const handleLoadMore = () => {
    if (!isFetching && data && data.products.length < data.total) {
      setPage(prev => prev + 1);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    if (!data?.products) {
      return [];
    }

    let result = [...data.products];

    if (selectedFilters.length > 0) {
      result = result.filter(product =>
        selectedFilters.includes(product.category),
      );
    }

    if (searchQuery) {
      result = result.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOrder !== null) {
      result.sort((a, b) => {
        const comparison = a.price - b.price;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data?.products, selectedFilters, searchQuery, sortOrder]);

  console.log(filteredAndSortedData[1]);

  const renderItem: ListRenderItem<Product> = ({item}) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', {product: item})}
    />
  );

  const ListEmptyComponent = () => (
    <Box alignSelf="center" alignItems="center" mt="xxxl">
      <Text mt="m" textAlign="center">
        {searchQuery
          ? `There are no items with "${searchQuery}".`
          : 'We are encountering a problem with loading store items. Please try again later.'}
      </Text>
    </Box>
  );

  const ListFooterComponent = () =>
    isFetching ? (
      <Box padding="m">
        <ActivityIndicator />
      </Box>
    ) : null;

  if (isLoading) {
    return (
      <LayoutContainer>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        <Box flex={1} justifyContent="center" alignItems="center" padding="m">
          <Text variant="regular14">Failed to load products</Text>
        </Box>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <ProductListHeader
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        searchQuery={searchQuery}
      />
      <FlatList
        data={filteredAndSortedData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.flatlistContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <Box height={16} />}
      />
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {padding: 16},
  columnWrapper: {gap: 16, justifyContent: 'flex-start'},
});
