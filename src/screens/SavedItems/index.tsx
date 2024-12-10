import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  UIManager,
} from 'react-native';
import {SavedItemsScreenProps} from '../../navigation/types';
import {ProcessedProduct, useProductProcessing} from '../../hooks/useProducts';
import {useTheme} from '../../theme';
import {useAppSelector} from '../../store/store';
import {selectSavedItems} from '../../store/slices/savedSlice';
import {navigationRef} from '../../components/Header';
import {performanceUtils} from '../../utils/performance';
import {
  Box,
  CustomTextInput,
  Icon,
  LayoutContainer,
  Pressable,
  Row,
  Text,
} from '../../components';
import {heightPixel} from '../../utils/responsiveDimensions';
import {Palette} from '../../theme/palette';
import {SavedItemsEmpty} from './components/SavedItemsEmpty';
import {ProductListSort} from '../ProductList/components/ProductListSort';
import {ProductCard} from '../ProductList/components/ProductCard';

export interface SortOption {
  label: string;
  key: 'price' | 'title' | 'rating' | 'discount' | 'stock';
  order: 'asc' | 'desc';
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const SavedItems: React.FC<SavedItemsScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<SortOption>({
    label: 'Price: Low to High',
    key: 'price',
    order: 'asc',
  });
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<ProcessedProduct[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const {colors} = useTheme();

  const savedItems = useAppSelector(selectSavedItems);
  const {items: cartItems} = useAppSelector(state => state.cart);

  // Process saved items with performance utils
  const {processedProducts, isProcessing} = useProductProcessing(savedItems);

  // Memoize handlers
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSort = useCallback(() => {
    setIsSortModalVisible(true);
  }, []);

  const handleApplySort = useCallback((sortOption: SortOption) => {
    setCurrentSort(sortOption);
  }, []);

  const navigateToCart = useCallback(() => {
    navigationRef.current.navigate('Cart');
  }, []);

  // Process filtering and sorting after interactions
  React.useEffect(() => {
    if (!processedProducts) {
      setFilteredData([]);
      return;
    }

    setIsFiltering(true);

    const filterTimeout = setTimeout(
      () => {
        performanceUtils.runAfterInteractions(async () => {
          let result = [...processedProducts];

          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
              product =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query),
            );
          }

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

          setFilteredData(result);
          setIsFiltering(false);
        });
      },
      searchQuery ? 300 : 0,
    ); // Add debounce for search

    return () => clearTimeout(filterTimeout);
  }, [processedProducts, searchQuery, currentSort]);

  // Memoize rendering functions
  const renderItem = useCallback<ListRenderItem<ProcessedProduct>>(
    ({item}) => (
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: ProcessedProduct) => item.id.toString(),
    [],
  );

  const CartBadge = useMemo(() => {
    if (cartItems.length === 0) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        justifyContent="center"
        borderRadius="l"
        height={heightPixel(20)}
        minWidth={heightPixel(20)}
        bg="transparentPrimary"
        paddingHorizontal="xxs"
        position="absolute"
        right={heightPixel(-6)}
        top={heightPixel(-6)}>
        <Text
          variant="regular10"
          color="primary"
          textAlign="center"
          style={{lineHeight: heightPixel(20)}}>
          {cartItems.length > 9 ? '9+' : cartItems.length}
        </Text>
      </Box>
    );
  }, [cartItems.length]);

  const HeaderRight = useMemo(
    () => (
      <Row gap="s" centerAlign>
        <Pressable
          bg="ash200"
          style={styles.headerButtons}
          onPress={handleSort}>
          <Icon name="Sort" size="m" color={Palette.black} />
        </Pressable>
        <Pressable
          bg="ash200"
          style={styles.headerButtons}
          onPress={navigateToCart}>
          {CartBadge}
          <Icon name="CartIcon" size="m" color="black" />
        </Pressable>
      </Row>
    ),
    [CartBadge, handleSort, navigateToCart],
  );

  const SearchInput = useMemo(
    () => (
      <Box mt="m" px="m">
        <CustomTextInput
          leftComponent={<Icon name="Search" size="l" color="black" />}
          hideLabel
          label="Search"
          autoCapitalize="none"
          placeholder="Search Saved Items..."
          value={searchQuery}
          onChangeText={handleSearch}
          addedContainerStyle={{
            backgroundColor: colors.fainterGrey,
            gap: heightPixel(8),
          }}
        />
      </Box>
    ),
    [colors.fainterGrey, handleSearch, searchQuery],
  );

  return (
    <LayoutContainer
      headerText="Saved Items"
      rightHeaderComponent={HeaderRight}>
      {SearchInput}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => (
          <SavedItemsEmpty
            loading={(isProcessing && !filteredData.length) || isFiltering}
            searchQuery={searchQuery}
          />
        )}
        contentContainerStyle={styles.flatlistContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <Box height={16} />}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={6}
        updateCellsBatchingPeriod={50}
      />
      <ProductListSort
        isVisible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        onApply={handleApplySort}
        currentSort={currentSort}
        ignoredSortKeys={['price']}
      />
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {padding: 16},
  columnWrapper: {gap: 16, justifyContent: 'flex-start'},
  headerButtons: {
    borderRadius: heightPixel(24),
    padding: heightPixel(12),
  },
});
