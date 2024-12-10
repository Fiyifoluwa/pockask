interface TaxRate {
  rate: number;
  threshold?: number;
}

export const TAX_RATES: TaxRate[] = [
  {rate: 0.05, threshold: 100},
  {rate: 0.08, threshold: 500},
  {rate: 0.1},
];
