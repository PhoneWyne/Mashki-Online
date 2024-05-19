import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {scale } from '../../utils';

const theme = 'light';
const colors =
  theme === 'dark'
    ? {text: COLORS.text_dark, bg: COLORS.bg_dark}
    : {
        headerColor: COLORS.header_light,
        heading: COLORS.text_primary_light,
        text: COLORS.text_secondary_light,
        bg: COLORS.bg_light,
      };

export const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  orderContainer:{
    width: '100%'
  },
  orderItem: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
  },
  orderText:{
    fontSize: 16,
    marginBottom: 5,
  },
  button:{
    backgroundColor: colors.headerColor,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonText:{
    textAlign:'center',
  },
});
