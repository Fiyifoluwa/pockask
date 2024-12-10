import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {AppStackParamList} from './types';
import {navigationRef} from '../components/Header';
import {ProductList} from '../screens/ProductList';
import {ProductDetails} from '../screens/ProductDetails';
import {Cart} from '../screens/Cart';
import {SavedItems} from '../screens/SavedItems';

const Stack = createStackNavigator<AppStackParamList>();

export const modalOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={() => {
          return {
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false,
          };
        }}>
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="SavedItems" component={SavedItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
