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
  bottleImgStyle: {
    height: scale(78),
    width: scale(52),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: scale(20),
    marginTop: scale(57),
    columnGap: scale(22),
  },
  cartButtonStyle: {
    height: scale(23),
    width: scale(23),
  },
  cartButtonContainer: {
    flexDirection: 'row',
    marginTop: scale(10),
  },
  cartButton: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  itemTextStyle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: colors.text,
  },
  itemPriceStyle: {
    fontSize: scale(14),
    marginTop: scale(4),
    fontWeight: '600',
    color: COLORS.text_primary_light,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    marginRight: scale(20),
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
  voucherContainer: {
    flexDirection: 'row',
    columnGap: scale(12),
    alignItems: 'center',
  },
  voucherText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.text_primary_light,
  },
  totalContainer: {
    marginTop: scale(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.text,
  },
  btnContainerStyle: {
    marginBottom: scale(35),
    marginTop: scale(55),
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
