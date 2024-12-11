import React, {forwardRef} from 'react';
import {StyleSheet, Platform} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  SharedValue,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  Box,
  CustomTextInput,
  Icon,
  Pressable,
  Touchable,
  Row,
  Text,
} from '../../../components';
import {useTheme} from '../../../theme';
import {heightPixel} from '../../../utils/responsiveDimensions';
import {navigationRef} from '../../../components/Header';
import {useAppSelector} from '../../../store/store';

interface ProductListHeaderProps {
  onSearch: (text: string) => void;
  onFilter: () => void;
  onSort: () => void;
  searchQuery: string;
  filterDisabled?: boolean;
  hidden?: boolean;
  style?: any;
  scrollY?: SharedValue<number>;
  lastScrollY?: SharedValue<number>;
  isInitialRender?: SharedValue<boolean>;
}

export const AnimatedBox = Animated.createAnimatedComponent(Box);

const TOP_SECTION_HEIGHT = Platform.select({ios: 70, android: 60}) ?? 70;
const SEARCH_SECTION_HEIGHT = Platform.select({ios: 110, android: 100}) ?? 110;
const SPRING_CONFIG = {
  damping: Platform.select({ios: 15, android: 20}),
  stiffness: Platform.select({ios: 100, android: 150}),
  mass: Platform.select({ios: 0.5, android: 0.8}),
};

const SCROLL_THRESHOLD = 10;

export const ProductListHeader = forwardRef<
  Animated.View,
  ProductListHeaderProps
>(
  (
    {
      onSearch,
      onFilter,
      onSort,
      searchQuery,
      filterDisabled,
      hidden,
      style,
      scrollY,
      lastScrollY,
    },
    ref,
  ) => {
    const {colors} = useTheme();
    const {items} = useAppSelector(state => state.cart);
    const headerVisible = useSharedValue(1);

    const visibilityFactor = useDerivedValue(() => {
      if (!scrollY?.value || !lastScrollY?.value) {
        return 1;
      }

      const scrollDiff = scrollY.value - lastScrollY.value;

      if (Math.abs(scrollDiff) > SCROLL_THRESHOLD) {
        const isScrollingUp = scrollDiff < 0;
        headerVisible.value = withSpring(isScrollingUp ? 1 : 0, {
          ...SPRING_CONFIG,
          velocity: Math.abs(scrollDiff),
        });
      }

      return headerVisible.value;
    }, [scrollY, lastScrollY]);

    const searchSectionStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        visibilityFactor.value,
        [0, 1],
        [-SEARCH_SECTION_HEIGHT, 0],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{translateY}],
        opacity: visibilityFactor.value,
        height: interpolate(
          visibilityFactor.value,
          [0, 1],
          [0, SEARCH_SECTION_HEIGHT],
          Extrapolate.CLAMP,
        ),
        marginTop: interpolate(
          visibilityFactor.value,
          [0, 1],
          [-SEARCH_SECTION_HEIGHT, 0],
          Extrapolate.CLAMP,
        ),
      };
    }, []);

    const navigateToSavedItems = () =>
      navigationRef.current.navigate('SavedItems');
    const navigateToCart = () => navigationRef.current.navigate('Cart');

    return (
      <Box ref={ref} style={[styles.container, style]} bg="background">
        <Box height={TOP_SECTION_HEIGHT} padding="m" bg="background">
          <Row centerAlign spaceBetween>
            <Text variant="regular24">Market</Text>
            <Row centerAlign gap="m">
              <Pressable
                style={styles.headerButtons}
                onPress={navigateToSavedItems}
                testID="bookmark-button">
                <Icon name="Bookmark" size="m" color="black" />
              </Pressable>
              <Pressable
                style={styles.headerButtons}
                onPress={navigateToCart}
                testID="cart-button">
                {items.length > 0 && (
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
                      allowFontScaling={false}
                      style={{lineHeight: heightPixel(20)}}>
                      {items.length > 9 ? '9+' : items.length}
                    </Text>
                  </Box>
                )}
                <Icon name="CartIcon" size="m" color="black" />
              </Pressable>
            </Row>
          </Row>
        </Box>

        {!hidden && (
          <AnimatedBox
            px="m"
            bg="background"
            style={[styles.searchSection, searchSectionStyle]}>
            <Box>
              <CustomTextInput
                leftComponent={<Icon name="Search" size="l" color="black" />}
                hideLabel
                label="Search"
                autoCapitalize="none"
                placeholder="Search Market..."
                value={searchQuery}
                onChangeText={onSearch}
                addedContainerStyle={{
                  backgroundColor: colors.fainterGrey,
                  gap: heightPixel(8),
                }}
              />
            </Box>

            <Row gap="s" mt="s">
              <Touchable
                onPress={onSort}
                style={styles.buttonWrapper}
                activeOpacity={0.8}>
                <Row centerAlign style={styles.button}>
                  <Icon name="Sort" size="l" color="black" />
                  <Text
                    variant="regular14"
                    textTransform="uppercase"
                    numberOfLines={1}
                    style={styles.buttonText}>
                    Sort
                  </Text>
                </Row>
              </Touchable>

              <Touchable
                activeOpacity={0.8}
                onPress={onFilter}
                disabled={filterDisabled}
                style={styles.buttonWrapper}>
                <Row centerAlign style={styles.button}>
                  <Icon name="FilterIcon" size="l" color="black" />
                  <Text
                    variant="regular14"
                    textTransform="uppercase"
                    numberOfLines={1}
                    style={styles.buttonText}>
                    Filter
                  </Text>
                </Row>
              </Touchable>
            </Row>
          </AnimatedBox>
        )}
      </Box>
    );
  },
);

ProductListHeader.displayName = 'ProductListHeader';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  searchSection: {
    overflow: 'hidden',
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: heightPixel(4),
  },
  buttonText: {
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  headerButtons: {
    backgroundColor: '#f5f5f5',
    borderRadius: heightPixel(24),
    padding: heightPixel(12),
  },
});
