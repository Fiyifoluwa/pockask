import {InteractionManager} from 'react-native';

export const performanceUtils = {
  /**
   * Runs a heavy operation after animations complete
   */
  runAfterInteractions: <T>(operation: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      InteractionManager.runAfterInteractions(() => {
        operation().then(resolve).catch(reject);
      });
    });
  },

  /**
   * Chunks array operations to prevent UI blocking
   */
  processInChunks: async <T, R>(
    items: T[],
    processItem: (item: T) => Promise<R>,
    chunkSize: number = 5,
  ): Promise<R[]> => {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(processItem);

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);

      await new Promise(resolve => requestAnimationFrame(resolve));
    }

    return results;
  },
};
