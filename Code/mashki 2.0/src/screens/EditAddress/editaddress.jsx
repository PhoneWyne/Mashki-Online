import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditAddress = ({ route }) => {
  const { phoneNumber } = route.params || {};
  const [area, setArea] = useState('');
  const [hnum, setHnum] = useState('');
  const [det1, setDet1] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDetails();
  }, []);
  // change phonenumber to the format being stored in the database
  const formattedPhoneNumber = `+92${phoneNumber}`;

  // fetches the user details which can be edited
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://192.168.95.207:5000/details/${formattedPhoneNumber}`);
      const data = await response.json();
      const userDetails = data.user;
      setArea(userDetails.area);
      setHnum(userDetails.hnum);
      setDet1(userDetails.det1);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  // handles the update in user details
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://192.168.95.207:5000/details/${formattedPhoneNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ area, hnum, det1 }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Details updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Area:</Text>
      <TextInput
        value={area}
        onChangeText={setArea}
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
      />
      <Text>House Number:</Text>
      <TextInput
        value={hnum}
        onChangeText={setHnum}
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
      />
      <Text>Details 1:</Text>
      <TextInput
        value={det1}
        onChangeText={setDet1}
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Update Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAddress;
