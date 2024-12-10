/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
  FlatListProps,
} from 'react-native';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../../store/services/api';
import {ProductListScreenProps} from '../../navigation/types';
import LayoutContainer from '../../components/LayoutContainer';
import Box from '../../components/Box';
import Text from '../../components/Text';
import {ProductCard} from './components/ProductCard';
import {ProductListHeader} from './components/ProductListHeader';
import {ProductListFilters} from './components/ProductListFilter';
import {ProductListSort} from './components/ProductListSort';
import {ProductListEmpty} from './components/ProductListEmpty';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {heightPixel} from '../../utils/responsiveDimensions';
import {ProcessedProduct, useProductProcessing} from '../../hooks/useProducts';
import {performanceUtils} from '../../utils/performance';

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<ProcessedProduct>>(FlatList);

export interface SortOption {
  label: string;
  key: 'price' | 'title' | 'rating' | 'discount' | 'stock';
  order: 'asc' | 'desc';
}

export const ProductList: React.FC<ProductListScreenProps> = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<ProcessedProduct[]>([]);

  const {
    data,
    isLoading: productsLoading,
    isFetching: productsFetching,
    error: productsError,
  } = useGetProductsQuery({
    limit: 20,
    skip: page * 20,
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {processedProducts} = useProductProcessing(data?.products);

  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const isInitialRender = useSharedValue(true);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      if (isInitialRender.value) {
        isInitialRender.value = false;
      }
      lastScrollY.value = scrollY.value;
      scrollY.value = event.contentOffset.y;
    },
  });

  const isLoading = productsLoading || categoriesLoading;
  const isFetching = productsFetching || categoriesFetching;
  const error = productsError || categoriesError;
  const errorType = categoriesError ? 'categories' : 'products';

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPage(0);
  };

  const handleFilter = () => {
    if (categories && categories.length > 0) {
      setIsFilterModalVisible(true);
    }
  };

  const handleSort = () => {
    setIsSortModalVisible(true);
  };

  const handleApplySort = (sortOption: SortOption) => {
    setCurrentSort(sortOption);
    setPage(0);
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

  useEffect(() => {
    if (!processedProducts) {
      setFilteredData([]);
      return;
    }

    performanceUtils.runAfterInteractions(async () => {
      let result = [...processedProducts];

      if (selectedFilters.length > 0) {
        result = result.filter(product =>
          selectedFilters.includes(product.category),
        );
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query),
        );
      }

      if (currentSort) {
        result.sort((a, b) => {
          let comparison: number;

          switch (currentSort.key) {
            case 'price':
              comparison = a.price - b.price;
              break;
            case 'title':
              comparison = a.title.localeCompare(b.title);
              break;
            case 'rating':
              comparison = a.rating - b.rating;
              break;
            case 'discount':
              comparison = a.discountPercentage - b.discountPercentage;
              break;
            case 'stock':
              comparison = a.stock - b.stock;
              break;
            default:
              comparison = 0;
          }

          return currentSort.order === 'asc' ? comparison : -comparison;
        });
      }

      setFilteredData(result);
    });
  }, [processedProducts, selectedFilters, searchQuery, currentSort]);

  const renderItem = useCallback<ListRenderItem<ProcessedProduct>>(
    ({item}) => (
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}
      />
    ),
    [navigation],
  );

  const ListFooterComponent = useCallback(
    () =>
      isFetching ? (
        <Box padding="m">
          <ActivityIndicator />
        </Box>
      ) : null,
    [isFetching],
  );

  const keyExtractor = useCallback(
    (item: ProcessedProduct) => item.id.toString(),
    [],
  );

  if (isLoading) {
    return (
      <LayoutContainer>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator testID="loading-indicator" />
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
        filterDisabled={!categories || categories.length === 0}
        hidden={processedProducts && processedProducts.length === 0}
        scrollY={scrollY}
        lastScrollY={lastScrollY}
        isInitialRender={isInitialRender}
      />
      <AnimatedFlatList
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (
          <ProductListEmpty
            isLoading={isLoading}
            isError={!!error}
            searchQuery={searchQuery}
            selectedFilters={selectedFilters}
            errorType={errorType}
          />
        )}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.flatlistContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <Box height={16} />}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={6}
        updateCellsBatchingPeriod={50}
        testID="product-list"
      />
      {categories && (
        <ProductListFilters
          isVisible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onApply={handleApplyFilters}
          selectedFilters={selectedFilters}
          categories={categories}
        />
      )}
      <ProductListSort
        isVisible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        onApply={handleApplySort}
        currentSort={currentSort}
        ignoredSortKeys={['stock']}
      />
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {padding: 16, paddingTop: heightPixel(200)},
  columnWrapper: {gap: 16, justifyContent: 'flex-start'},
});
