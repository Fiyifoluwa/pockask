import React, {useState} from 'react';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import {StyleProp, ActivityIndicator} from 'react-native';
import Box from '../Box';

interface Props extends Omit<FastImageProps, 'source'> {
  source: {uri: string} | number;
  fallbackSource?: {uri: string} | number;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
  style?: StyleProp<ImageStyle>;
}

const Image: React.FC<Props> = ({
  source,
  fallbackSource,
  style,
  onLoadStart,
  onLoadEnd,
  onError,
  resizeMode = FastImage.resizeMode.cover,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
    onError?.();
  };

  const handleLoadStart = () => {
    setLoading(true);
    onLoadStart?.();
  };

  const handleLoadEnd = () => {
    setLoading(false);
    onLoadEnd?.();
  };

  if (error && fallbackSource) {
    return (
      <FastImage
        source={fallbackSource}
        style={style}
        resizeMode={resizeMode}
        {...props}
      />
    );
  }

  return (
    <Box>
      <FastImage
        source={source}
        style={style}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        resizeMode={resizeMode}
        {...props}
      />
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          backgroundColor="background"
          opacity={0.7}>
          {!fallbackSource ? (
            <ActivityIndicator />
          ) : (
            <FastImage
              source={fallbackSource}
              style={style}
              resizeMode={resizeMode}
              {...props}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Image;
