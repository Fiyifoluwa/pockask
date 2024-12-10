import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {Box, Text} from '../../../components';
import {Category} from '../../../types/api';

interface ProductListFiltersProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: string[]) => void;
  selectedFilters: string[];
  categories: Category[];
}

export const ProductListFilters = ({
  isVisible,
  onClose,
  onApply,
  selectedFilters,
  categories,
}: ProductListFiltersProps) => {
  const [tempFilters, setTempFilters] =
    React.useState<string[]>(selectedFilters);

  React.useEffect(() => {
    if (isVisible) {
      setTempFilters(selectedFilters);
    }
  }, [isVisible, selectedFilters]);

  const handleToggleFilter = (category: Category) => {
    setTempFilters(prev =>
      prev.includes(category.slug)
        ? prev.filter(f => f !== category.slug)
        : [...prev, category.slug],
    );
  };

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
        <Box>
          <Box
            height={4}
            width={40}
            backgroundColor="black"
            style={styles.handle}
          />
          <Text variant="textInputLabel" style={styles.title}>
            Filters
          </Text>
        </Box>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box gap="s">
            {categories.map(category => (
              <TouchableOpacity
                key={category.slug}
                onPress={() => handleToggleFilter(category)}
                style={[
                  styles.filterOption,
                  tempFilters.includes(category.slug) && styles.selectedFilter,
                ]}>
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </Box>
        </ScrollView>

        <Box flexDirection="row" gap="m" style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setTempFilters(selectedFilters);
              onClose();
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.applyButton]}
            onPress={() => {
              onApply(tempFilters);
              onClose();
            }}>
            <Text color="white">Apply</Text>
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
    maxHeight: '80%',
  },
  handle: {
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  filterOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedFilter: {
    backgroundColor: '#e0e0e0',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  applyButton: {
    backgroundColor: '#000',
  },
});
