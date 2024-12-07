import {StackScreenProps} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';
import {Product} from '../types/api';

export type AppStackParamList = {
  ProductList: undefined;
  ProductDetail: {product: Product};
  Cart: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export type AppStackNavigationType = NavigationProp<AppStackParamList>;

export type ProductListScreenProps = AppStackScreenProps<'ProductList'>;
export type ProductDetailScreenProps = AppStackScreenProps<'ProductDetail'>;
export type CartScreenProps = AppStackScreenProps<'Cart'>;
