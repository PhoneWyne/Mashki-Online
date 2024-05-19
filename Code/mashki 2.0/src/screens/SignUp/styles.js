import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {scale} from '../../utils';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(65),
    backgroundColor: COLORS.bg_light,
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: COLORS.text_primary_light,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(18),
    color: '#212e3e',
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: scale(40),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  inputLabel: {
    fontSize: scale(16),
    marginBottom: scale(5),
    color: '#000',
    marginLeft: scale(38),
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: scale(65),
    borderColor: '#ddd',
    borderRadius: 10,
  },
  fixedPrefix: {
    fontSize: scale(16),
    color: '#000',
    paddingHorizontal: scale(10),
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: scale(20),
    alignSelf: 'stretch',
    padding: scale(15),
    height: scale(65),
    backgroundColor: '#4397cb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(50),
    marginHorizontal: scale(38),
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#76a5c0', // A disabled look color
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  loginText: {
    fontSize: 16,
    color: '#141414',
  },
  loginButton: {
    fontSize: 16,
    color: '#037BC0',
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 16,
    color: '#141414',
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
