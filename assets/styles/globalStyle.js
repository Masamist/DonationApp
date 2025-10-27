import {StyleSheet} from 'react-native';
import { horizontalScale } from './scaling';

const globalStyle = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: horizontalScale(24),
  }
});

export default globalStyle;