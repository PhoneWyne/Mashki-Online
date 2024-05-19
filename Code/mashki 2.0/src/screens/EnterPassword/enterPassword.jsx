/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants';
import {LeftArrowSvg, HiddenIconSvg} from '../../SVGIcons';
import {scale} from '../../utils';
import {styles} from './style';
import {ModalView} from '../../components/modal/modal';

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;


export const EnterPassword = ({route}) => {
  const {firstname, lastname, phoneNumber, area, hnum, det1} = route.params || {};
  // console.log(firstname,lastname)


  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isHiddenPassword2, setIsHiddenPassword2] = useState(true);
  // states
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  // theme
  const theme = 'light';

  const colors =
    theme === 'dark'
      ? {text: COLORS.text_dark, bg: COLORS.bg_dark}
      : {
          heading: COLORS.text_primary_light,
          text: COLORS.text_secondary_light,
          bg: COLORS.bg_light,
        };

  //  Password Visibility
  const handleHiddenPress = () => {
    setIsHiddenPassword(!isHiddenPassword);
  };
  const handleHiddenPress2 = () => {
    setIsHiddenPassword2(!isHiddenPassword2);
  };

  //modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // handles the password check and stores user credentials in the database
  const handleDone = async () => {
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one uppercase letter and one number.'
      );
      return;
    }

    if (password !== rePassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      // Send user details to the server
      const response = await fetch('http://192.168.95.207:5000/sendAllDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: '+92' + phoneNumber,
          firstname,
          lastname,
          password,
          area,
          hnum,
          det1,
          usertype: 'customer',
        }),
      });

      if (response.ok) {
        console.log('User details sent to the server successfully');
        toggleModal();
        setTimeout(() => {
          toggleModal();
          navigation.navigate('Home', {phoneNumber});
        }, 2000); // 2000 milliseconds = 2 seconds
      } else {
        console.error('Failed to save user on the server');
        // Handle error appropriately
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior as needed
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              marginTop: scale(30),
              marginLeft: scale(20),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: scale(22),
                fontWeight: 'bold',
                color: colors.heading,
                textAlign: 'center',
              }}>
              Create Password
            </Text>
            <Text
              style={{
                fontSize: scale(18),
                fontWeight: '400',
                color: colors.text,
                textAlign: 'center',
              }}>
              Fresh water delivered to your doorstep
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Image source={require('../../../assets/password_bg.png')} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginLeft: scale(38),
              marginRight: scale(38),
              marginTop: scale(73),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              Password
            </Text>
            <View
              style={{
                borderColor: '#D9D9D9',
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                height: scale(60),
                paddingLeft: scale(10),
              }}>
              <TextInput
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={isHiddenPassword}
                value={password}
                onChangeText={text => setPassword(text)}
                style={{
                  color: colors.text,
                  flex: 1,
                }}
              />
              <View style={{marginRight: scale(15)}}>
                <HiddenIconSvg onPress={handleHiddenPress} />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(20),
              marginLeft: scale(38),
              marginRight: scale(38),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              Re-enter Password
            </Text>
            <View
              style={{
                borderColor: '#D9D9D9',
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                height: scale(60),
                paddingLeft: scale(10),
              }}>
              <TextInput
                placeholder={'Enter your password'}
                keyboardType="default"
                secureTextEntry={isHiddenPassword2}
                value={rePassword}
                onChangeText={text => setRePassword(text)}
                style={{
                  color: colors.text,
                  flex: 1,
                }}
              />
              <View style={{marginRight: scale(15)}}>
                <HiddenIconSvg onPress={handleHiddenPress2} />
              </View>
            </View>
          </View>
          <View style={{marginBottom: scale(35), marginTop: scale(55)}}>
            <TouchableOpacity style={styles.button} onPress={handleDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ModalView
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        nextScreen={'Home'}
        headingText={'Registration Completed'}
        bodyText={'You Can Now place an order on MashkiOnline'}
      />
    </KeyboardAvoidingView>
  );
};
