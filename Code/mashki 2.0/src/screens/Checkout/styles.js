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
  addressContainer: {
    marginTop: scale(37),
    marginHorizontal: scale(25),
  },
  title: {
    fontSize: scale(16),
    fontWeight: '700',
    color: colors.text,
  },
  change: {
    fontSize: scale(16),
    fontWeight: '500',
    color: colors.text,
    textDecorationLine: 'underline',
  },
  addressStyle: {
    marginTop: scale(10),
    rowGap: scale(20),
    width: '30%',
  },
  addressText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.text,
  },
  paymentText: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#424347',
  },
  addCardText: {
    fontSize: scale(12),
    fontWeight: '400',
    color: '#3E3E3E',
  },
  cardDisplay: {
    marginTop: scale(20),
  },
  chargesContainer: {
    marginTop: scale(60),
    rowGap: scale(10),
    marginHorizontal: scale(18),
  },
  chargesFieldStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chargesTextStyle: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.text,
  },
  btnContainer: {
    marginTop: scale(30),
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
  btnText: {
    color: 'white',
    fontSize: scale(16),
    height: scale(25),
    fontWeight: '600',
    textAlign: 'center',
  },
});
