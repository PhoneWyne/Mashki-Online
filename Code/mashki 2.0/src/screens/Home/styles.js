import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {scale} from '../../utils';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
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
  headerColor: {
    backgroundColor: colors.headerColor,
  },
  headerContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginTop: scale(30),
    paddingBottom: scale(14),
  },
  titleStyle: {
    fontSize: scale(22),
    fontWeight: '600',
    color: 'white',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imgStyle: {
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    marginLeft: scale(20),
    marginRight: scale(42),
  },
  itemHeading: {
    fontSize: scale(20),
    fontWeight: '700',
    color: colors.text,
  },
  itemPrice: {
    fontSize: scale(18),
    fontWeight: '400',
    marginTop: scale(3),
    color: colors.text,
  },
  itemDescription: {
    marginTop: scale(5),
    fontSize: scale(12),
    fontWeight: '400',
    color: colors.text,
  },
  cartButtonContainer: {
    marginLeft: scale(20),
    marginTop: scale(30),
  },
  qtyHeader: {
    fontSize: scale(12),
    fontWeight: '500',
    color: colors.text,
    marginBottom: scale(5),
  },
  qtyText: {
    alignSelf: 'center',
    marginHorizontal: scale(22),
    fontSize: scale(16),
    fontWeight: '400',
    color: '#625D5D',
  },
  cartButton: {
    flexDirection: 'row',
  },
  btnContainerStyle: {
    marginBottom: scale(35),
    marginTop: scale(55),
  },
  btnStyle: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor: COLORS.btn_primary,
    borderColor: COLORS.btn_primary,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: scale(18),
    paddingBottom: scale(15),
    paddingTop: scale(15),
  },
  btnQtyText: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    width: scale(25),
    height: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
  btnText2: {
    color: 'white',
    fontSize: scale(16),
    height: scale(25),
    width: '100%',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnPriceText: {
    fontSize: scale(16),
    fontWeight: '500',
    color: 'white',
  },
  menuContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 100,
    width: 200,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
