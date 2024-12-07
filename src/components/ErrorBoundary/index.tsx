import React, {Component, ErrorInfo, ReactNode} from 'react';
import Box from '../Box';
import Text from '../Text';
import Button from '../Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({hasError: false, error: undefined});
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box flex={1} justifyContent="center" alignItems="center" padding="m">
          <Text variant="headerText">Something went wrong</Text>
          <Text variant="regular14" marginVertical="m">
            {this.state.error?.message}
          </Text>
          <Button
            backgroundColor="primary"
            label="Try Again"
            onPress={this.handleReset}
          />
        </Box>
      );
    }

    return this.props.children;
  }
}
