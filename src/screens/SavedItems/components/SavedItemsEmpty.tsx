import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated} from 'react-native';
import {Box, Text} from '../../../components';

interface SavedItemsEmptyStateProps {
  searchQuery?: string;
  loading: boolean;
}

export const SavedItemsEmpty: React.FC<SavedItemsEmptyStateProps> = ({
  searchQuery,
  loading,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentContent, setCurrentContent] = useState<
    'loading' | 'empty' | 'noResults'
  >(() => {
    if (loading) {
      return 'loading';
    }
    if (searchQuery) {
      return 'noResults';
    }
    return 'empty';
  });

  useEffect(() => {
    let newContent: 'loading' | 'empty' | 'noResults';

    if (loading) {
      newContent = 'loading';
    } else if (searchQuery) {
      newContent = 'noResults';
    } else {
      newContent = 'empty';
    }

    if (newContent !== currentContent) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentContent(newContent);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else if (fadeAnim._value === 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, searchQuery]);

  const renderContent = () => {
    switch (currentContent) {
      case 'loading':
        return (
          <>
            <ActivityIndicator size="large" />
            <Text variant="regular14" marginTop="m">
              Loading...
            </Text>
          </>
        );
      case 'noResults':
        return (
          <>
            <Text variant="headerText" textAlign="center" marginBottom="m">
              No Matching Saved Items
            </Text>
            <Text variant="regular14" textAlign="center" color="ash200">
              {searchQuery
                ? `No saved items found matching "${searchQuery}".`
                : 'No saved items found in the selected categories.'}
            </Text>
          </>
        );
      case 'empty':
        return (
          <>
            <Text variant="headerText" textAlign="center" marginBottom="m">
              No Saved Items Yet
            </Text>
            <Text
              variant="regular14"
              textAlign="center"
              color="placeholderTextColor">
              Items you save will appear here for easy access later.
            </Text>
          </>
        );
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}>
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        {renderContent()}
      </Box>
    </Animated.View>
  );
};
