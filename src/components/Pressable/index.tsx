import {createBox} from '@shopify/restyle';
import type React from 'react';
import {
  Pressable as NSPressable,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native';

import {type Theme} from '../../theme';

const getPressable = () =>
  createBox<
    Theme,
    React.ComponentProps<typeof NSPressable> & {children?: React.ReactNode}
  >(NSPressable);

const getTouchable = () =>
  createBox<
    Theme,
    React.ComponentProps<typeof RNTouchableOpacity> & {
      children?: React.ReactNode;
    }
  >(RNTouchableOpacity);

export type PressableProps = React.ComponentProps<
  ReturnType<typeof getPressable>
>;

export const Pressable = getPressable();
export const Touchable = getTouchable();
