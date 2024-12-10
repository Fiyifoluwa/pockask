import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Box, Icon, Image, Pressable, Row, Text} from '../../../components';
import {heightPixel} from '../../../utils/responsiveDimensions';
import {useSavedProducts} from '../../../hooks/useSavedProducts';
import {formatAmount} from '../../../utils/functions';
import {ProcessedProduct} from '../../../hooks/useProducts';
import {Palette} from '../../../theme/palette';

interface ProductCardProps {
  product: ProcessedProduct;
  onPress: () => void;
  onRemove?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onRemove,
}) => {
  const {isProductSaved, toggleSaveProduct} = useSavedProducts();
  const saved = isProductSaved(product.id);

  const handleToggleSaved = () => {
    toggleSaveProduct(product);
    if (!saved && onRemove) {
      onRemove(product.id);
    }
  };

  return (
    <Pressable onPress={onPress} flex={1} maxWidth={'48%'} testID="save-button">
      <Box style={styles.cardShadow}>
        <Box
          bg="fainterGrey"
          borderColor="fainterGrey"
          borderWidth={1}
          borderRadius={'s'}
          overflow="hidden">
          <Pressable
            onPress={handleToggleSaved}
            position="absolute"
            p="s"
            bg="transparentBlack"
            borderBottomLeftRadius="s"
            zIndex={20}
            alignSelf="flex-end">
            {saved ? (
              <Icon
                name="HeartFilled"
                size="m"
                color={'pink'}
                testID="heart-filled-icon"
              />
            ) : (
              <Icon
                name="Heart"
                size="m"
                color="black"
                testID="heart-outline-icon"
              />
            )}
          </Pressable>
          <Box>
            <Image
              source={{uri: product.thumbnail}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
            {product.discountPercentage > 0 && (
              <Box
                bg="transparentPrimary"
                px="xs"
                py="xxs"
                position="absolute"
                bottom={heightPixel(8)}>
                <Text variant="regular10" color="primary">
                  -{product.discountPercentage}%
                </Text>
              </Box>
            )}
          </Box>
          <Box padding="s" bg="white">
            <Text variant="regular14" numberOfLines={1}>
              {product.title}
            </Text>
            <Row spaceBetween marginTop="s" alignItems="flex-end">
              <Row gap="xs" centerAlign>
                <Icon name="Star" size="sm" style={styles.iconStyle} />
                <Text variant="regular10" color="placeholderTextColor">
                  {product.rating}
                </Text>
              </Row>
              <Box alignItems="flex-end">
                <Text
                  variant="regular12"
                  color="placeholderTextColor"
                  textDecorationLine="line-through">
                  {formatAmount(product.originalPrice)}
                </Text>
                <Text variant="bold14" color="primary">
                  {formatAmount(product.discountedPrice)}
                </Text>
              </Box>
            </Row>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: heightPixel(130),
  },
  cardShadow: {
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        shadowColor: '#000',
      },
    }),
  },
  iconStyle: {marginTop: -1.5, color: Palette.placeholderTextColor},
});
