import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {scale} from '../../utils';

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: COLORS.btn_primary,
    borderColor: '#51C168',
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: scale(38),
    marginRight: scale(38),
    paddingBottom: scale(17),
    paddingTop: scale(17),
  },
  button2: {
    alignSelf: 'stretch',
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: 'row',
    marginLeft: scale(20),
    marginRight: scale(20),
    paddingBottom: scale(17),
    paddingTop: scale(17),
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(22),
    fontWeight: '500',
    textAlign: 'center',
  },
  labelContainer: {
    alignSelf: 'flex-start',
    marginStart: scale(10),
    paddingHorizontal: scale(3),
    position: 'absolute',
    top: scale(-12),
    zIndex: 1,
  },
});
