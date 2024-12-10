import React from 'react';
import {Box, Icon, Pressable, Row, Text} from '../../../components';
import {useSavedProducts} from '../../../hooks/useSavedProducts';
import {ProcessedProduct} from '../../../hooks/useProducts';
import {formatAmount} from '../../../utils/functions';
import StockLevel from './StockLevel';

interface ProductInfoProps {
  product: ProcessedProduct;
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

      <Row alignItems="flex-end" spaceBetween marginBottom="md">
        <Box>
          <Row centerAlign gap="sm">
            <Text variant="regular16" color="primary">
              {formatAmount(product.discountedPrice)}
            </Text>
            {product.discountPercentage > 0 && (
              <Box bg="transparentPrimary" px="xs" py="xxs" borderRadius="l">
                <Text variant="regular10" color="primary">
                  -{product.discountPercentage}% off
                </Text>
              </Box>
            )}
          </Row>

          <Text
            variant="regular12"
            color="black"
            textDecorationLine="line-through">
            {formatAmount(product.originalPrice)}
          </Text>
        </Box>
        <Box
          backgroundColor="primary"
          paddingHorizontal="s"
          paddingVertical="xs"
          borderRadius="l">
          <Text variant="regular12" color="background">
            {product.category}
          </Text>
        </Box>
      </Row>

      <Text variant="regular14" color="mainText">
        {product.description}
      </Text>

      <Box marginVertical="m" gap="sml">
        <Row centerAlign gap="xs">
          <Text variant="regular12" color="black">
            Product Rating:
          </Text>
          <Text variant="bold12" color="black" style={{marginBottom: -2}}>
            {product.rating}
          </Text>
        </Row>
        <Row centerAlign gap="xs">
          <Text variant="regular12" color="black">
            Stock level:
          </Text>
          <StockLevel quantity={product.stock} />
        </Row>
      </Box>
    </Box>
  );
};
