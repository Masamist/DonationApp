import {StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: horizontalScale(26),
    width: horizontalScale(44),
    height: horizontalScale(44),
    alignItems: 'center',
    justifyContent:'center',
  }
})

export default style;