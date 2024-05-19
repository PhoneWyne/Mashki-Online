import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; // Import Axios for making API calls
import {useNavigation} from '@react-navigation/native';


const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

const TransporterSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');
  const navigation = useNavigation();

  // stores credentials in the database if they pass certain checks
  const handleSignup = async () => {
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one uppercase letter and one number.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (cnic.length !== 13) {
      Alert.alert('Invalid CNIC', 'CNIC must be 13 digits long.');
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid CNIC', 'CNIC must be 13 digits long.');
      return;
    }

    try {
      // Make POST request to signup transporter
      const response = await axios.post('http://192.168.95.207:5000/signup/transporter', {
        phoneNumber: '+92' + phoneNumber,
        name,
        password,
        cnic,
      });
      if (response.status === 200) {
        console.log('Transporter signed up successfully');
        // Clear input fields after successful signup
        setPhoneNumber('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setCnic('');
        navigation.navigate('TransporterHome', {phoneNumber});
      } else {
        console.error('Failed to signup transporter:', response.data.error);
      }
    } catch (error) {
      console.error('Error signing up transporter:', error);
    }
  };

  return (
    <View>
      <Text>Phone Number:</Text>
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text>Name:</Text>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text>Confirm Password:</Text>
      <TextInput
        placeholder="Re-enter password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <Text>CNIC:</Text>
      <TextInput
        placeholder="Enter CNIC"
        value={cnic}
        onChangeText={setCnic}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default TransporterSignup;
