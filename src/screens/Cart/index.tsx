import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {LayoutContainer, Box} from '../../components';
import {CartScreenProps} from '../../navigation/types';
import {CartEmpty} from './components/CartEmpty';
import {CartItem} from './components/CartItem';
import {CartSummary} from './components/CartSummary';
import {calculateTax} from '../../utils/functions';
import {CartItem as CartItemType} from '../../types/api';
import {useAppSelector} from '../../store/store';

export const Cart: React.FC<CartScreenProps> = ({}) => {
  const {items, total, savedAmount} = useAppSelector(state => state.cart);
  const tax = calculateTax(total, 1);
  const finalTotal = total + tax;

  const renderItem = useCallback(
    ({item}: {item: CartItemType}) => <CartItem item={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: CartItemType) => item.id.toString(),
    [],
  );

  const ItemSeparator = useCallback(() => <Box height={12} />, []);
  const ListFooter = useCallback(() => <Box height={12} />, []);

  if (items.length === 0) {
    return (
      <LayoutContainer headerText=" ">
        <CartEmpty />
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer headerText="Your Cart">
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{padding: 16}}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
      />

      <CartSummary
        subtotal={total}
        tax={tax}
        total={finalTotal}
        savedAmount={savedAmount}
        onCheckout={() => {}}
      />
    </LayoutContainer>
  );
};
