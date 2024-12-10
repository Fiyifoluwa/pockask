import React from 'react';
import Navigation from './src/navigation';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ErrorBoundary} from './src/components/ErrorBoundary';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Navigation />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
