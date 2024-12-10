import React from 'react';
import {Box, Text, Row, Button} from '../../../components';
import {formatAmount} from '../../../utils/functions';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  savedAmount: number;

  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax,
  total,
  savedAmount,
  onCheckout,
}) => (
  <Box
    padding="m"
    backgroundColor="background"
    elevation={4}
    borderTopWidth={1}
    borderTopColor="segmentBorderColor">
    <Row spaceBetween marginBottom="s">
      <Text variant="regular12" color="placeholderTextColor">
        Subtotal
      </Text>
      <Text variant="regular12">{formatAmount(subtotal)}</Text>
    </Row>

    {savedAmount > 0 && (
      <Row spaceBetween marginBottom="s">
        <Text variant="regular12" color="placeholderTextColor">
          Saved Amount
        </Text>
        <Text variant="regular12" color="placeholderTextColor">
          -{formatAmount(savedAmount)}
        </Text>
      </Row>
    )}

    <Row spaceBetween marginBottom="m">
      <Text variant="regular12" color="placeholderTextColor">
        Tax
      </Text>
      <Text variant="regular12">{formatAmount(tax)}</Text>
    </Row>

    <Row spaceBetween marginBottom="l">
      <Text variant="bold24">Total</Text>
      <Text variant="bold24">{formatAmount(total)}</Text>
    </Row>

    <Button
      label="Proceed to Checkout"
      onPress={onCheckout}
      backgroundColor="black"
      marginLeft="xs"
    />
  </Box>
);
