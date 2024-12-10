import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ProductDetailsScreenProps} from '../../navigation/types';
import {Box, Button, LayoutContainer} from '../../components';
import {addToCart} from '../../store/slices/cartSlice';
import {ImageGallery} from './components/ImageGallery';
import {ProductInfo} from './components/ProductDetails';
import {Palette} from '../../theme/palette';
import ProductDetailsHeader from './components/ProductDetailsHeader';
import {useAppDispatch} from '../../store/store';

export const ProductDetails: React.FC<ProductDetailsScreenProps> = ({
  route,
}) => {
  const {product} = route.params;
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <LayoutContainer>
      <ProductDetailsHeader />

      <ScrollView bounces={false} style={styles.scrollview}>
        <Box flex={1}>
          <ImageGallery thumbnail={product.thumbnail} images={product.images} />

          <Box padding="m" bg="transparentBlack">
            <ProductInfo product={product} />
          </Box>
        </Box>
      </ScrollView>

      <Button
        label="Add to Cart"
        onPress={handleAddToCart}
        marginHorizontal="l"
        backgroundColor="black"
      />
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  scrollview: {flex: 1, backgroundColor: Palette.white},
});
