import React, {createRef, RefObject} from 'react';

import Pressable from '../Pressable';
import Text from '../Text';
import {type NavigationContainerRef} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/types';
import Box from '../Box';
import Row from '../Row';
import Icon from '../Icon';
import {heightPixel} from '../../utils/responsiveDimensions';
// import type {SvgIconPackTypeExtended} from '@/assets/icons/svgIconPack';

export const navigationRef: RefObject<
  // @ts-ignore
  NavigationContainerRef<AppStackParamList>
> = createRef();

const Header = ({
  headerText,
  showBackButton = true,
  rightHeaderComponent,
}: {
  headerText: string;
  showBackButton?: boolean;
  rightHeaderComponent?: React.ReactNode;
}) => {
  const goBack = () => {
    navigationRef.current?.goBack();
  };

  return (
    <Box paddingHorizontal="m">
      {showBackButton && (
        <Row centerAlign spaceBetween marginVertical={'s'} bg="transparent">
          <Box width={'30%'}>
            {showBackButton && (
              <Pressable
                onPress={goBack}
                bg="ash200"
                alignSelf="flex-start"
                padding="sm"
                height={heightPixel(40)}
                width={heightPixel(40)}
                alignItems="center"
                justifyContent="center"
                borderRadius="xxxl">
                <Icon name={'Back'} size="m" color="black" />
              </Pressable>
            )}
          </Box>

          <Box>
            <Text color="black" variant="bold16">
              {headerText}
            </Text>
          </Box>

          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="flex-end"
            width="30%">
            {rightHeaderComponent}
          </Box>
        </Row>
      )}
    </Box>
  );
};

export default Header;
