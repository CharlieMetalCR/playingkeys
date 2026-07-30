import 'lucide-react-native';
import type { ColorValue, ViewStyle } from 'react-native';

declare module 'lucide-react-native' {
  interface LucideProps {
    color?: ColorValue;
    style?: ViewStyle;
  }
}
