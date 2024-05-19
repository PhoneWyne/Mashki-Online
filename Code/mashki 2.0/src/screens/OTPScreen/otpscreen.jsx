/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../constants';
import {LeftArrowSvg} from '../../SVGIcons';
import {scale} from '../../utils';
import {styles} from './style';
import {ModalView} from '../../components';

export const OTPScreen = ({route}) => {
  // theme
  const theme = 'light';
  const colors =
    theme === 'dark'
      ? {text: COLORS.text_secondary_dark, bg: COLORS.bg_dark}
      : {text: COLORS.text_secondary_light, bg: COLORS.bg_light};

  const navigation = useNavigation();
  const {phoneNumber} = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleButtonPress = () => {
    toggleModal();

    setTimeout(() => {
      toggleModal();
      navigation.navigate('Details',{phoneNumber});
    }, 2000);
  };

  useEffect(() => {
    // Cleanup function to ensure the modal is hidden when the component unmounts
    return () => {
      if (modalVisible) {
        toggleModal();
      }
    };
  }, [modalVisible]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={{flex: 1, backgroundColor: colors.bg}}>
          <View style={{marginHorizontal: scale(30), marginTop: scale(50)}}>
            <LeftArrowSvg
              SvgHeight={scale(20)}
              SvgWidth={scale(11.78)}
              fillColor={colors.text}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: scale(65),
              marginTop: scale(35),
            }}>
            <Image source={require('../../../assets/otp_bg.png')} />
            <Text
              style={{
                color: colors.text,
                textAlign: 'center',
                fontSize: scale(24),
                fontWeight: '700',
              }}>
              OTP Verification
            </Text>
            <Text
              style={{
                color: colors.text,
                textAlign: 'center',
                fontSize: scale(18),
                fontWeight: '400',
              }}>
              Enter Your Verification Code
            </Text>
            <Text
              style={{
                color: colors.text,
                textAlign: 'center',
                paddingHorizontal: scale(25),
                fontSize: scale(12),
              }}>
              OTP has been sent to your registered mobile number ending with,
              ******{phoneNumber.slice(-4)}
            </Text>
          </View>
          <View style={{marginHorizontal: scale(45), marginTop: scale(25)}}>
            {/* <OTPInputView
              style={{height: scale(80)}}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                width: scale(60),
                borderRadius: 5,
                color: colors.text,
                height: scale(60),
              }}
              codeInputHighlightStyle={{
                borderColor: '#037BC0',
              }}
            /> */}
          </View>
          <View
            style={{
              marginHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: scale(30),
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: scale(14),
              }}>
              Didn't receive a code?{' '}
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: scale(14),
                fontWeight: 'bold',
                color: COLORS.text_primary_light,
              }}>
              Resend
            </Text>
          </View>
          <View style={{marginBottom: scale(50), marginTop: scale(42)}}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleButtonPress}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: scale(14),
                fontWeight: '400',
              }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: scale(14),
                  fontWeight: 'bold',
                  color: '#037BC0',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nextScreen={'Details'}
        headingText={'Verification Completed'}
        bodyText={'You have successfully verified the account.'}
      />
    </KeyboardAwareScrollView>
  );
};
