import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
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
  scrollY?: Animated.SharedValue<number>;
  lastScrollY?: Animated.SharedValue<number>;
  isInitialRender?: Animated.SharedValue<boolean>;
}

export const AnimatedBox = Animated.createAnimatedComponent(Box);

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
      isInitialRender,
    },
    ref,
  ) => {
    const {colors} = useTheme();
    const {items} = useAppSelector(state => state.cart);

    const navigateToSavedItems = () => {
      navigationRef.current.navigate('SavedItems');
    };
    const navigateToCart = () => {
      navigationRef.current.navigate('Cart');
    };

    const animatedStyle = useAnimatedStyle(() => {
      if (!scrollY || !lastScrollY) {
        return {};
      }

      const isScrollingUp = scrollY.value < lastScrollY.value;
      const shouldShow = isInitialRender?.value || isScrollingUp;

      return {
        height: withSpring(shouldShow ? 115 : 0, {
          damping: 15,
          stiffness: 100,
          mass: 0.5,
        }),
        opacity: withSpring(shouldShow ? 1 : 0, {
          damping: 15,
          stiffness: 100,
          mass: 0.5,
        }),
        transform: [
          {
            translateY: withSpring(shouldShow ? 0 : -115, {
              damping: 15,
              stiffness: 100,
              mass: 0.5,
            }),
          },
        ],
      };
    }, [scrollY, lastScrollY]);

    return (
      <Box
        ref={ref}
        bg="white"
        style={[styles.container, style]}
        borderBottomWidth={1}
        borderBottomColor="fainterGrey">
        {/* Static top section */}
        <Box padding="m">
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

        {/* Animated bottom section */}
        {!hidden && (
          <AnimatedBox
            px="m"
            style={[
              {
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
              },
              animatedStyle,
            ]}>
            <Box>
              <CustomTextInput
                leftComponent={<Icon name="Search" size="l" color="black" />}
                hideLabel
                label="Search"
                autoCapitalize="none"
                placeholder={'Search Market...'}
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
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
