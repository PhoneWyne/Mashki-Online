// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {styles} from './styles';
// import {COLORS} from '../../constants';
// import {PhoneField} from '../../components';
// export const Signup = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigation = useNavigation();

//   // Only allow numeric input and limit the length to 10 characters
//   const handlePhoneChange = text => {
//     const cleanedText = text.replace(/[^0-9]/g, '');
//     setPhoneNumber(cleanedText);
//   };

//   const isPhoneNumberValid = phoneNumber.length === 10;
//   const theme = 'light';
//   const colors =
//     theme === 'dark'
//       ? {text: COLORS.text_dark, bg: COLORS.bg_dark}
//       : {
//           heading: COLORS.text_primary_light,
//           text: COLORS.text_secondary_light,
//           bg: COLORS.bg_light,
//         };
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>
//       <Text style={styles.subtitle}>
//         Fresh water delivered to your doorstep
//       </Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.inputLabel}>Mobile Number</Text>
//         <PhoneField
//           phoneNumber={phoneNumber}
//           setPhoneNumber={setPhoneNumber}
//           colors={colors}
//         />
//       </View>

//       <TouchableOpacity
//         style={[styles.button, !isPhoneNumberValid && styles.buttonDisabled]}
//         onPress={() => {
//           if (isPhoneNumberValid) {
//             navigation.navigate('OTP', {phoneNumber: '+92' + phoneNumber}); // Navigate to the OtpScreen when valid
//           }
//         }}
//         disabled={!isPhoneNumberValid}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>

//       <View style={styles.loginContainer}>
//         <Text style={styles.loginText}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.loginButton}>Login</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text style={styles.skipText}>Skip for now</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../constants';
import { PhoneField } from '../../components';

export const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handlePhoneChange = text => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleanedText);
  };

  const isPhoneNumberValid = phoneNumber.length === 10;

  // const handleContinue = async (e) => {
  //   if (isPhoneNumberValid) {
  //     try {
  //       // Save user details locally
  //       // await AsyncStorage.setItem('phoneNumber', '+92' + phoneNumber);

  //       // Send user details to the server
  //       const response = await fetch('http://10.130.171.105:5000/signup', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ phoneNumber: '+92' + phoneNumber }),
  //       });
  //       console.log(response)
  //       if (response.ok) {
  //         console.log("i should be navigated")
  //         console.log("number is ",phoneNumber)
  //         navigation.navigate('OTP', {phoneNumber});
  //       } else {
  //         console.error('Failed to save user on the server');
  //         // Handle error appropriately
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       // Handle error appropriately
  //     }
  //   }
  // };

  const theme = 'light';
  const colors =
    theme === 'dark'
      ? { text: COLORS.text_dark, bg: COLORS.bg_dark }
      : {
          heading: COLORS.text_primary_light,
          text: COLORS.text_secondary_light,
          bg: COLORS.bg_light,
        };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Fresh water delivered to your doorstep</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <PhoneField
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          colors={colors}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isPhoneNumberValid && styles.buttonDisabled]}
        onPress={() => navigation.navigate('OTP', {phoneNumber})}
        disabled={!isPhoneNumberValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity> */}
    </KeyboardAvoidingView>
  );
};
