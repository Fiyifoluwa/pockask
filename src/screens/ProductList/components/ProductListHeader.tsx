import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Box,
  CustomTextInput,
  Icon,
  Pressable,
  Row,
  Text,
} from '../../../components';
import {useTheme} from '../../../theme';
import {heightPixel} from '../../../utils/responsiveDimensions';

interface ProductListHeaderProps {
  onSearch: (text: string) => void;
  onFilter: () => void;
  onSort: () => void;
  searchQuery: string;
}

export const ProductListHeader = ({
  onSearch,
  onFilter,
  onSort,
  searchQuery,
}: ProductListHeaderProps) => {
  const {colors} = useTheme();

  return (
    <Box padding="m" pb="none" gap="s">
      <Row centerAlign spaceBetween>
        <Text variant="regular24">Market</Text>

        <Row centerAlign gap="m">
          <Pressable style={styles.headerButtons}>
            <Icon name="Plus" size="ll" />
          </Pressable>
          <Pressable style={styles.headerButtons}>
            <Icon name="Plus" size="ll" />
          </Pressable>
        </Row>
      </Row>

      <Box mt="m">
        <CustomTextInput
          leftComponent={<Icon name="Search" size="ll" />}
          hideLabel
          label="Search"
          autoCapitalize="none"
          placeholder={'Search Market...'}
          value={searchQuery}
          onChangeText={onSearch}
          addedContainerStyle={{
            backgroundColor: colors.fainterGrey,
            gap: heightPixel(8),
          }}
        />
      </Box>

      <Row gap="s">
        <Pressable onPress={onSort} style={styles.buttonWrapper}>
          <Row centerAlign style={styles.button}>
            <Text
              variant="regular14"
              textTransform="uppercase"
              numberOfLines={1}
              style={styles.buttonText}>
              Sort
            </Text>
          </Row>
        </Pressable>

        <Pressable onPress={onFilter} style={styles.buttonWrapper}>
          <Row centerAlign style={styles.button}>
            <Text
              variant="regular14"
              textTransform="uppercase"
              numberOfLines={1}
              style={styles.buttonText}>
              Filter
            </Text>
          </Row>
        </Pressable>
      </Row>
    </Box>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  headerButtons: {
    backgroundColor: '#f5f5f5',
    borderRadius: heightPixel(24),
    padding: heightPixel(8),
  },
});
