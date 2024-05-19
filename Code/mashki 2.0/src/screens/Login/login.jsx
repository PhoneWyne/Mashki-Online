/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CheckBox from 'expo-checkbox';
import {useNavigation} from '@react-navigation/native';
import {PhoneField} from '../../components';
import {HiddenIconSvg} from '../../SVGIcons';
import {scale} from '../../utils';
import {styles} from './styles';
import {COLORS} from '../../constants';

export const Login = () => {
  //  Dummy inputs
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // states
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const navigation = useNavigation();

  const theme = 'light';
  const colors =
    theme === 'dark'
      ? {text: COLORS.text_dark, bg: COLORS.bg_dark}
      : {
          heading: COLORS.text_primary_light,
          text: COLORS.text_secondary_light,
          bg: COLORS.bg_light,
        };

  // callbacks
  // password hide and show option
  const handleHiddenPress = () => {
    setIsHiddenPassword(!isHiddenPassword);
  };

  // matches phone number and password entered against the database.
  // in case of a match, routes user to their respective home page
  const handleLogin = async () => {
    try {
      // const response = await fetch('http://192.168.100.57:5000/login', {
      const response = await fetch('http://192.168.95.207:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: '+92' + phoneNumber, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { usertype } = data; // Assuming the backend response includes usertype
        if (usertype === 'customer') {
          navigation.navigate('Home', { phoneNumber });
        } else if (usertype === 'admin') {
          navigation.navigate('AdminHome', { phoneNumber });
        }else if (usertype === 'lab') {
          navigation.navigate('LabHome', { phoneNumber });
        } else if (usertype === 'transport') {
          navigation.navigate('TransporterHome', { phoneNumber });
        } else if (usertype === 'plant') {
          navigation.navigate('PlantHome', { phoneNumber });
        }
        else {
          console.error('Unknown user type:', usertype);
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Hi , Welcome Back</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: scale(18),
              fontWeight: '400',
              color: colors.text,
              textAlign: 'center',
            }}>
            Your water journey continues
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginLeft: scale(38),
          fontWeight: '400',
          marginRight: scale(38),
          marginBottom: scale(15),
          color: colors.text,
          marginTop: scale(50),
        }}>
        Mobile Number
      </Text>
      <PhoneField
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        colors={colors}
      />
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            marginLeft: scale(36),
            marginRight: scale(38),
            marginBottom: scale(15),
            fontWeight: '400',
            color: colors.text,
            marginVertical: scale(12),
          }}>
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
            marginHorizontal: scale(38),
          }}>
          <TextInput
            placeholder={'Enter your password'}
            placeholderTextColor={COLORS.greyTextColor}
            keyboardType="default"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={isHiddenPassword}
            style={{
              color: colors.text,
              fontSize: scale(14),
              flex: 1,
            }}
          />
          <View style={{marginRight: scale(15)}}>
            <HiddenIconSvg onPress={handleHiddenPress} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(30),
            marginHorizontal: scale(38),
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#037BC0'}}
            />
            <Text
              style={{
                fontSize: scale(14),
                color: colors.text,
                fontWeight: '400',
                alignSelf: 'center',
              }}>
              Remember me
            </Text>
          </View>
          <Pressable>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: scale(8),
                fontWeight: '400',
                color: '#037BC0',
                fontSize: scale(14),
              }}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <View style={{marginBottom: scale(50), marginTop: scale(45)}}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: scale(20),
          flexDirection: 'row',
          justifyContent: 'center',
          // marginTop: scale(5),
        }}>
        <Text
          style={{
            color: colors.text,
            fontSize: scale(24),
            fontWeight: '400',
          }}>
          First time here?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupChoice')}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: scale(24),
              fontWeight: 'bold',
              color: '#037BC0',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
