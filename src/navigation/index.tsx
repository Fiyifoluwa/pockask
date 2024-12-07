import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AppStackParamList} from './types';
import {navigationRef} from '../components/Header';
import {ProductList} from '../screens/ProductList';

const Stack = createStackNavigator<AppStackParamList>();

export const modalOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProductList" component={ProductList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
