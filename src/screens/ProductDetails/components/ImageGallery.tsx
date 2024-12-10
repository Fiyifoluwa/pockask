import React, {useState} from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Box, Image, Row} from '../../../components';

interface ImageGalleryProps {
  images: string[];
  thumbnail: string;
}

const {width} = Dimensions.get('window');

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  thumbnail,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderImage = ({item: uri}: {item: string}) => (
    <Image
      source={{uri}}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
      fallbackSource={{uri: thumbnail}}
    />
  );

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <Box>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {images.length > 1 && (
        <Box
          position="absolute"
          bottom={16}
          left={0}
          right={0}
          alignItems="center">
          <Row padding="s" bg="transparentBlack" borderRadius="m">
            {images.map((_, index) => (
              <Box
                key={index}
                width={6}
                height={6}
                borderRadius={'xs'}
                backgroundColor={
                  index === activeIndex ? 'primary' : 'background'
                }
                opacity={index === activeIndex ? 1 : 0.5}
                marginHorizontal="xs"
              />
            ))}
          </Row>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height: width,
  },
});
