import React from 'react';
import {Box, Icon, Pressable, Row, Text} from '../../../components';
import {Product} from '../../../types/api';
import {useSavedProducts} from '../../../hooks/useSavedProducts';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
  const {isProductSaved, toggleSaveProduct} = useSavedProducts();

  const saved = isProductSaved(product.id);

  const handleToggleSaved = () => {
    toggleSaveProduct(product);
  };

  return (
    <Box>
      <Row spaceBetween marginBottom="s">
        <Text variant="bold24">{product.title}</Text>
        <Pressable onPress={handleToggleSaved}>
          {saved ? (
            <Icon name="HeartFilled" size="l" color="pink" />
          ) : (
            <Icon name="Heart" size="l" color="black" />
          )}
        </Pressable>
      </Row>

      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="m">
        <Text variant="regular10" color="primary">
          ${product.price}
        </Text>
        <Box
          backgroundColor="primary"
          paddingHorizontal="s"
          paddingVertical="xs"
          borderRadius={'xs'}>
          <Text variant="regular12" color="background">
            {product.category}
          </Text>
        </Box>
      </Box>

      <Text variant="regular12" color="mainText">
        {product.description}
      </Text>
    </Box>
  );
};
