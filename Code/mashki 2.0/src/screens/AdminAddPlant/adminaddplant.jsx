import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import Axios for making API calls
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';


const AdminAddPlant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [waterPlantsList, setWaterPlantsList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWaterPlants();
  }, []);

  const fetchWaterPlants = async () => {
    try {
      // Make GET request to fetch water plants
      // the water plants will appear in a list which are already in the database
      const response = await axios.get('http://192.168.95.207:5000/admin/water-plants');
      if (response.status === 200) {
        setWaterPlantsList(response.data);
      } else {
        console.error('Failed to fetch water plants:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching water plants:', error);
    }
  };

  const handleAddWaterPlant = async () => {
    try {
      // Make POST request to add water plant
      // adds water plant to the database
      const response = await axios.post('http://192.168.95.207:5000/admin/add-water-plant', {
        name,
        address,
        phoneNumber: '+92' + phoneNumber,
        password
      });
      if (response.status === 200) {
        console.log('Water plant added successfully');
        // Clear input fields after successful addition
        setName('');
        setAddress('');
        setPhoneNumber('');
        setPassword('');
        // Fetch updated list of water plants
        fetchWaterPlants();
      } else {
        console.error('Failed to add water plant:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding water plant:', error);
    }
  };

  const handleDeleteWaterPlant = async (phoneNumber) => {
    try {
      // Make DELETE request to delete water plant
      // removes water plant from the database
      console.log(phoneNumber)
      const response = await axios.delete(`http://192.168.95.207:5000/admin/delete-water-plant/${phoneNumber}`);
      if (response.status === 200) {
        console.log('Water plant deleted successfully');
        // Fetch updated list of water plants
        fetchWaterPlants();
      } else {
        console.error('Failed to delete water plant:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting water plant:', error);
    }
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
    // link to signup page
  };

  const homePageLink = () => {
    // Navigate to another page (replace 'AnotherPage' with the name of your desired page)
    navigation.navigate('AdminHome');
    // link to admin home page
  };


  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerColor}>
        <View style={styles.headerContainerStyle}>
          <Button title="Home" onPress={homePageLink} />
          <View />
          <Text style={styles.titleStyle}>Plant Management</Text>
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
        <Text>Name:</Text>
        <TextInput
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Text>Address:</Text>
        <TextInput
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />
        <Text>Phone Number:</Text>
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text>Password:</Text>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Add Water Plant" onPress={handleAddWaterPlant} />

        {/* Display list of water plants */}
        <Text>Water Plants:</Text>
        <FlatList
          data={waterPlantsList}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.address}</Text>
              <Text>{item.phoneNumber}</Text>
              <TouchableOpacity onPress={() => handleDeleteWaterPlant(item.phoneNumber)}>
                <Text>Delete</Text>
              </TouchableOpacity>
              {/* Button to edit water plant details */}
              {/* Button to edit details can be added here */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AdminAddPlant;
