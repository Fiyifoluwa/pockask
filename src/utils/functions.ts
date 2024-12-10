import {TAX_RATES} from './config';

/**
 * Calculates the total credit or debit amount of transactions within a date range.
 *
 * @param amount The amount to be formatted
 * @param hidden The boolean for what object is returned. True will return a masked naira value
 * @param currency The currency value to be returned
 * @returns An object containing currency, naira, and kobo. This applies to other currencies as well.
 */
export const formatAmount = (
  amount: string | number,
  currency: string = 'USD',
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  });

  const roundedAmount = parseFloat(Number(amount).toFixed(2));

  if (!isNaN(roundedAmount) && roundedAmount !== 0) {
    const fullAmount = formatter.format(roundedAmount);
    const parts = fullAmount.split('.');
    const currencySymbol = parts[0][0]; // "$"
    const wholeNumberPart = parts[0].slice(1); // "1,234"
    const fractionalPart = parts[1]; // "56"

    return `${currencySymbol}${wholeNumberPart}.${fractionalPart}`;
  }
  return '$0.00';
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const calculateTax = (price: number, quantity: number): number => {
  const totalPrice = price * quantity;
  const applicableRate =
    TAX_RATES.find(({threshold}) => !threshold || totalPrice <= threshold) ||
    TAX_RATES[TAX_RATES.length - 1];

  return totalPrice * applicableRate.rate;
};
