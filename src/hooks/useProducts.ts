import React, {useState} from 'react';
import {Product} from '../types/api';
import {performanceUtils} from '../utils/performance';
import FastImage from 'react-native-fast-image';
import {formatAmount} from '../utils/functions';

export interface ProcessedProduct extends Product {
  formattedPrice: string;
  formattedDiscount: string;
  imagePreloaded?: boolean;
}

export const useProductProcessing = (products: Product[] | undefined) => {
  const [processedProducts, setProcessedProducts] = useState<
    ProcessedProduct[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (!products) {
      return;
    }

    const processProducts = async () => {
      setIsProcessing(true);
      try {
        await performanceUtils.runAfterInteractions(async () => {
          const processed = await performanceUtils.processInChunks(
            products,
            async product => {
              if (product.thumbnail) {
                await FastImage.preload([{uri: product.thumbnail}]);
              }

              return {
                ...product,
                formattedPrice: formatAmount(product.price),
                formattedDiscount: `${product.discountPercentage.toFixed(
                  0,
                )}% OFF`,
                imagePreloaded: true,
              };
            },
            5,
          );
          setProcessedProducts(processed);
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processProducts();
  }, [products]);

  return {processedProducts, isProcessing};
};
