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
  headerContainer: {
    justifyContent: 'center',
    backgroundColor: colors.headerColor,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: scale(28),
    marginTop: scale(30),
    paddingBottom: scale(14),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: scale(22),
    fontWeight: '600',
    color: 'white',
  },
});
