import React from 'react';
import Box from '../components/Box';
import Text from '../components/Text';
import {ToastConfigParams} from 'react-native-toast-message';

interface ToastProps {
  text: string;
}

interface TaxRate {
  rate: number;
  threshold?: number;
}

export const toastConfig = {
  successToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="malachite100" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="malachite800" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
  infoToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="ochre100" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="ochre800" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
  dangerToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="cardinal50" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="red" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
};

const TAX_RATES: TaxRate[] = [
  {rate: 0.05, threshold: 100},
  {rate: 0.08, threshold: 500},
  {rate: 0.1},
];

export const calculateTax = (price: number, quantity: number): number => {
  const totalPrice = price * quantity;
  const applicableRate =
    TAX_RATES.find(({threshold}) => !threshold || totalPrice <= threshold) ||
    TAX_RATES[TAX_RATES.length - 1];

  return totalPrice * applicableRate.rate;
};
