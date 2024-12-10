import React, {useState} from 'react';
import {Product} from '../types/api';
import {performanceUtils} from '../utils/performance';
import FastImage from 'react-native-fast-image';

export interface ProcessedProduct extends Product {
  discountedPrice: number;
  originalPrice: number;
  imagePreloaded: boolean;
}

const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number = 0,
): number => {
  const discount = price * (discountPercentage / 100);
  return price - discount;
};

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

              const discountedPrice = calculateDiscountedPrice(
                product.price,
                product.discountPercentage,
              );

              return {
                ...product,
                discountedPrice,
                imagePreloaded: true,
                originalPrice: product.price,
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
