import {StackScreenProps} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';
import {Product} from '../types/api';

export type AppStackParamList = {
  ProductList: undefined;
  ProductDetails: {product: Product};
  Cart: undefined;
  SavedItems: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export type AppStackNavigationType = NavigationProp<AppStackParamList>;

export type ProductListScreenProps = AppStackScreenProps<'ProductList'>;
export type ProductDetailsScreenProps = AppStackScreenProps<'ProductDetails'>;
export type CartScreenProps = AppStackScreenProps<'Cart'>;
export type SavedItemsScreenProps = AppStackScreenProps<'SavedItems'>;
