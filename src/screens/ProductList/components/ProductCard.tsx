import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Product} from '../../../types/api';
import {useAppDispatch} from '../../../store/hooks';
import {addToCart} from '../../../store/slices/cartSlice';
import {Box, Icon, Image, Pressable, Row, Text} from '../../../components';
import {heightPixel} from '../../../utils/responsiveDimensions';
import {capitalizeFirstLetter} from '../../../utils/functions';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, onPress}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Pressable onPress={onPress} flex={1} maxWidth={'48%'}>
      <Box style={styles.cardShadow}>
        <Box
          bg="fainterGrey"
          borderColor="fainterGrey"
          borderWidth={1}
          borderRadius={'s'}
          overflow="hidden">
          <Box
            position="absolute"
            p="s"
            bg="transparentBlack"
            borderBottomLeftRadius="s"
            zIndex={20}
            alignSelf="flex-end">
            <Icon name="Plus" size="ll" />
          </Box>
          <Box>
            <Image
              source={{uri: product.thumbnail}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Box>
          <Box padding="s" bg="white">
            <Text variant="regular14" numberOfLines={1}>
              {product.title}
            </Text>
            <Row centerAlign spaceBetween marginTop="s">
              <Box>
                <Text variant="regular10" color="placeholderTextColor">
                  {product.rating}
                </Text>
              </Box>
              <Text variant="bold16" color="primary">
                ${product.price}
              </Text>
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
    // backgroundColor: 'transparent',
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
});
