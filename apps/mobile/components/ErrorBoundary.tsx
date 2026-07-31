import { View, Text } from 'react-native';
import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17', padding: 20 }}>
          <Text style={{ color: '#EF4444', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>CRASH</Text>
          <Text style={{ color: '#F9FAFB', fontSize: 12, fontFamily: 'monospace' }}>
            {this.state.error.message}{'\n\n'}{this.state.error.stack}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}
