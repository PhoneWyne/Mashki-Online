import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import Axios for making API calls
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const AdminAddLaboratory = () => {
  const [labName, setLabName] = useState('');
  const [labAddress, setLabAddress] = useState('');
  const [labPhoneNumber, setLabPhoneNumber] = useState('');
  const [labPassword, setLabPassword] = useState('');
  const [labCredentialsList, setLabCredentialsList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchLabCredentials();
  }, []);

  const fetchLabCredentials = async () => {
    try {
      // Make GET request to fetch laboratory credentials
      // it will appear like a list
      const response = await fetch('http://192.168.100.57:5000/admin/lab-credentials');
      if(response.ok){
        const data = await response.json();
        setLabCredentialsList(data);
      }else{
        console.error('Failed to fetch lab credentials:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching laboratory credentials:', error);
    }
  };

  const handleAddLabCredentials = async () => {
    try {
      // Make POST request to add laboratory credentials
      // this is to add laboratories to the database
      const response = await axios.post('http://192.168.100.57:5000/admin/add-lab-credentials', {
        labName,
        labAddress,
        labPhoneNumber: '+92' + labPhoneNumber,
        labPassword
      });
      if (response.status === 200) {
        console.log('Laboratory credentials added successfully');
        // Clear input fields after successful addition
        setLabName('');
        setLabAddress('');
        setLabPhoneNumber('');
        setLabPassword('');
        // Fetch updated list of laboratory credentials
        fetchLabCredentials();
      } else {
        console.error('Failed to add laboratory credentials:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding laboratory credentials:', error);
    }
  };

  const handleDeleteLabCredentials = async (phoneNumber) => {
    try {
      // Make DELETE request to delete laboratory credentials
      // this is to delete a particular laboratory from the database
      const response = await axios.delete(`http://192.168.100.57:5000/admin/delete-lab-credentials/${phoneNumber}`);
      if (response.status === 200) {
        console.log('Laboratory credentials deleted successfully');
        // Fetch updated list of laboratory credentials
        fetchLabCredentials();
      } else {
        console.error('Failed to delete laboratory credentials:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting laboratory credentials:', error);
    }
  };

  const handleSignOut = () => {
    navigation.navigate('Signup');
    // link to signup page
  };

  const homePageLink = () => {
    navigation.navigate('AdminHome');
    // link to admin home page
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerColor}>
        <View style={styles.headerContainerStyle}>
          <Button title="Home" onPress={homePageLink} />
          <View />
          <Text style={styles.titleStyle}>Laboratory Management</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <View style={styles.iconStyle}>
              <Image
                source={require('../../../assets/signout.png')}
                style={{ width: 20, height: 22, tintColor: 'white' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Lab Name:</Text>
        <TextInput
          placeholder="Enter lab name"
          value={labName}
          onChangeText={setLabName}
        />
        <Text>Lab Address:</Text>
        <TextInput
          placeholder="Enter lab address"
          value={labAddress}
          onChangeText={setLabAddress}
        />
        <Text>Lab Phone Number:</Text>
        <TextInput
          placeholder="Enter lab phone number"
          value={labPhoneNumber}
          onChangeText={setLabPhoneNumber}
        />
        <Text>Password:</Text>
        <TextInput
          placeholder="Enter password"
          value={labPassword}
          onChangeText={setLabPassword}
          secureTextEntry={true}
        />
        <Button title="Add Lab Credentials" onPress={handleAddLabCredentials} />

        {/* Display list of laboratory credentials */}
        <Text>Laboratory Credentials:</Text>
        <FlatList
          data={labCredentialsList}
          keyExtractor={(item) => item.labPhoneNumber}
          renderItem={({ item }) => (
            <View>
              <Text>{item.labName}</Text>
              <Text>{item.labAddress}</Text>
              <Text>{item.labPhoneNumber}</Text>
              <TouchableOpacity onPress={() => handleDeleteLabCredentials(item.labPhoneNumber)}>
                <Text>Delete</Text>
              </TouchableOpacity>
              {/* Button to edit laboratory credentials */}
              {/* Button to edit credentials can be added here */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AdminAddLaboratory;
