import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {scale} from '../../utils';

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
  orderId: {
    fontSize: scale(18),
    alignSelf: 'center',
    marginTop: scale(37),
    fontWeight: '500',
    color: '#707070',
  },

  deliveryBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
    paddingHorizontal: scale(20),
    alignSelf: 'stretch',
    backgroundColor: '#393939',
    borderColor: '#393939',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: scale(18),
    paddingBottom: scale(15),
    paddingTop: scale(15),
  },
  deliveryBtnText: {
    color: 'white',
    fontSize: scale(16),
    height: scale(25),
    fontWeight: '600',
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: scale(85),
    rowGap: scale(20),
  },
  btnStyle: {
    paddingHorizontal: scale(20),
    alignSelf: 'stretch',
    backgroundColor: COLORS.btn_primary,
    borderColor: COLORS.btn_primary,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: scale(18),
    paddingBottom: scale(15),
    paddingTop: scale(15),
  },
  btnStyle2: {
    paddingHorizontal: scale(20),
    alignSelf: 'stretch',
    backgroundColor: colors.bg,
    borderColor: COLORS.btn_primary,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: scale(18),
    paddingBottom: scale(15),
    paddingTop: scale(15),
  },
  btnText: {
    color: 'white',
    fontSize: scale(16),
    height: scale(25),
    fontWeight: '600',
    textAlign: 'center',
  },
  btnText2: {
    color: COLORS.text_primary_light,
    fontSize: scale(16),
    height: scale(25),
    fontWeight: '600',
    textAlign: 'center',
  },
});
