import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Box, Text} from '../../../components';
export interface SortOption {
  label: string;
  key: 'price' | 'title' | 'rating' | 'discount' | 'stock';
  order: 'asc' | 'desc';
}

interface ProductListSortProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (sort: SortOption) => void;
  currentSort: SortOption | null;
  ignoredSortKeys?: SortOption['key'][];
}

const sortOptions: SortOption[] = [
  {label: 'Price: Low to High', key: 'price', order: 'asc'},
  {label: 'Price: High to Low', key: 'price', order: 'desc'},
  {label: 'Name: A to Z', key: 'title', order: 'asc'},
  {label: 'Name: Z to A', key: 'title', order: 'desc'},
  {label: 'Rating: High to Low', key: 'rating', order: 'desc'},
  {label: 'Rating: Low to High', key: 'rating', order: 'asc'},
  {label: '% Discount: High to Low', key: 'discount', order: 'desc'},
  {label: 'Stock: Low to High', key: 'stock', order: 'asc'},
];

export const ProductListSort = ({
  isVisible,
  onClose,
  onApply,
  currentSort,
  ignoredSortKeys = [],
}: ProductListSortProps) => {
  const filteredSortOptions = sortOptions.filter(
    option => !ignoredSortKeys.includes(option.key),
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      propagateSwipe
      backdropTransitionOutTiming={0}
      useNativeDriver
      useNativeDriverForBackdrop>
      <Box style={styles.modalContent} backgroundColor="white">
        <Box
          height={4}
          width={40}
          backgroundColor="black"
          style={styles.handle}
        />
        <Text variant="textInputLabel" style={styles.title}>
          Sort By
        </Text>
        <Box gap="s">
          {filteredSortOptions.map(option => (
            <TouchableOpacity
              key={`${option.key}-${option.order}`}
              onPress={() => {
                onApply(option);
                onClose();
              }}
              style={[
                styles.sortOption,
                currentSort?.key === option.key &&
                  currentSort?.order === option.order &&
                  styles.selectedSort,
              ]}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </Box>
        <Box marginTop="l" mb="s">
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 8,
  },
  handle: {
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
  },
  sortOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedSort: {
    backgroundColor: '#e0e0e0',
  },
  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
});
