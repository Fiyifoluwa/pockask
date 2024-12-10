import React from 'react';
import {Box, Text, Button, Icon, LayoutContainer} from '../../../components';
import {navigationRef} from '../../../components/Header';

export const CartEmpty = () => (
  <LayoutContainer>
    <Box flex={1} justifyContent="center" alignItems="center" padding="m">
      <Icon name="CartIcon" size="xxl" color="textSecondary" />
      <Text variant="headerText" marginTop="m" textAlign="center">
        Your cart is empty
      </Text>
      <Text
        variant="regular12"
        color="placeholderTextColor"
        marginTop="s"
        textAlign="center">
        Browse our products and add items to your cart
      </Text>
      <Button
        label="Start Shopping"
        onPress={() => navigationRef.current?.navigate('ProductList')}
        marginTop="l"
        backgroundColor="black"
      />
    </Box>
  </LayoutContainer>
);
