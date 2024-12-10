import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, Icon, Pressable, Row, Text} from '../../../components';
import {navigationRef} from '../../../components/Header';
import {heightPixel} from '../../../utils/responsiveDimensions';
import {useAppSelector} from '../../../store/store';

const ProductDetailsHeader = () => {
  const navigateToCart = () => {
    navigationRef.current?.navigate('Cart');
  };

  const {items} = useAppSelector(state => state.cart);

  return (
    <>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'transparent']}
        style={styles.gradient}
        pointerEvents="none"
      />

      <Row
        px="m"
        position="absolute"
        spaceBetween
        centerAlign
        style={styles.headerRow}
        zIndex={1}>
        <Pressable
          bg="transparentBlack"
          style={styles.headerButtons}
          onPress={() => navigationRef.current?.goBack()}>
          <Icon name="Back" size="m" color="black" />
        </Pressable>
        <Row gap="s">
          <Pressable
            bg="transparentBlack"
            style={styles.headerButtons}
            onPress={navigateToCart}>
            {items.length > 0 && (
              <Box
                alignItems="center"
                justifyContent="center"
                borderRadius="l"
                height={heightPixel(20)}
                minWidth={heightPixel(20)}
                bg="primary"
                paddingHorizontal="xxs"
                position="absolute"
                right={heightPixel(-6)}
                top={heightPixel(-6)}>
                <Text
                  variant="regular10"
                  color="white"
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
    </>
  );
};

export default ProductDetailsHeader;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: heightPixel(100),
    zIndex: 1,
  },
  headerRow: {
    top: heightPixel(16),
    left: 0,
    right: 0,
  },
  headerButtons: {
    borderRadius: heightPixel(24),
    padding: heightPixel(12),
  },
});
