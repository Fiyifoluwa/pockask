import React from 'react';
import {Box, Text, Row, Pressable, Icon, Image} from '../../../components';
import {CartItem as CartItemType} from '../../../types/api';
import {updateQuantity, removeFromCart} from '../../../store/slices/cartSlice';
import {StyleSheet} from 'react-native';
import {heightPixel, widthPixel} from '../../../utils/responsiveDimensions';
import {formatAmount} from '../../../utils/functions';
import {useAppDispatch} from '../../../store/store';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({item}) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      dispatch(updateQuantity({id: item.id, quantity: newQuantity}));
    }
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Box
      backgroundColor="background"
      borderColor="segmentBorderColor"
      borderWidth={1}
      borderRadius="m"
      padding="s">
      <Row centerAlign>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
        <Box flex={1} marginLeft="m">
          <Row spaceBetween>
            <Box flex={1}>
              <Text variant="regular12" numberOfLines={2}>
                {item.title}
              </Text>

              <Row marginTop="xs" gap="s" centerAlign>
                <Text variant="regular12" color="black">
                  {formatAmount(item.discountedPrice)}
                </Text>
                {item.discountPercentage > 0 && (
                  <Box bg="transparentPrimary" px="s" py="xxs" borderRadius="m">
                    <Text variant="regular10" color="primary">
                      {item.discountPercentage}% off
                    </Text>
                  </Box>
                )}
              </Row>
              <Text
                variant="regular10"
                color="placeholderTextColor"
                style={styles.strikethrough}>
                {formatAmount(item.originalPrice)}
              </Text>
            </Box>
            <Pressable
              onPress={handleRemoveFromCart.bind(null, item.id)}
              borderRadius="s"
              borderWidth={1}
              borderColor="segmentBorderColor"
              ml="sml"
              p="xs"
              hitSlop={8}>
              <Icon name="Trash" size="m" color="red" />
            </Pressable>
          </Row>

          <Row marginTop="m" spaceBetween centerAlign>
            <Row centerAlign gap="xs">
              <Pressable
                onPress={handleQuantityChange.bind(null, -1)}
                style={styles.quantityButton}
                borderRadius="xs"
                bg="background">
                <Icon name="MinusOne" size="sm" color="black" />
              </Pressable>

              <Box minWidth={heightPixel(32)}>
                <Text textAlign="center" variant="regular10">
                  {item.quantity}
                </Text>
              </Box>

              <Pressable
                onPress={handleQuantityChange.bind(null, 1)}
                style={styles.quantityButton}
                borderRadius="xs"
                bg="background">
                <Icon name="Plus" size="sm" color="black" />
              </Pressable>
            </Row>

            <Text variant="regular16">
              {formatAmount(item.discountedPrice * item.quantity)}
            </Text>
          </Row>
        </Box>
      </Row>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: widthPixel(80),
    height: heightPixel(80),
    borderRadius: 8,
  },
  quantityButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});
