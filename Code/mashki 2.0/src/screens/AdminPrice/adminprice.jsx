import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Button } from 'react-native';

const AdminPrice = () => {
  const navigation = useNavigation();
  const [itemNames, setItemNames] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchItemNames();
  }, []);

  // fetches the products being sold on the application
  const fetchItemNames = async () => {
    try {
      const response = await fetch('http://192.168.95.207:5000/items');
      if (response.ok) {
        const data = await response.json();
        setItemNames(data.itemNames);
      } else {
        console.error('Failed to fetch item names:', response.status);
      }
    } catch (error) {
      console.error('Error fetching item names:', error);
    }
  };

  // fetches the current price of the products
  const fetchCurrentPrice = async (itemName) => {
    try {
      const response = await fetch(`http://192.168.95.207:5000/price/${itemName}`);
      if (response.ok) {
        const data = await response.json();
        return data.price;
      } else {
        console.error('Failed to fetch current price for', itemName);
      }
    } catch (error) {
      console.error('Error fetching current price:', error);
    }
    return null;
  };

  // caters to change in product price
  const handleUpdatePrice = async () => {
    try {
      const response = await fetch('http://192.168.95.207:5000/update-price/12LitersRefill', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemName: selectedItem, price: newPrice }),
      });
      if (response.ok) {
        console.log('Price updated successfully');
      } else {
        console.error('Failed to update price:', response.status);
      }
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
    // link to signup page
  };

  // renders the products and their prices
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={async () => {
      setSelectedItem(item);
      const currentPrice = await fetchCurrentPrice(item);
    }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
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
          <Text style={styles.titleStyle}>Pricing page</Text>
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

      <TouchableOpacity style={styles.changePricesButton} onPress={fetchItemNames}>
        <Text style={styles.changePricesButtonText}>Change Prices</Text>
      </TouchableOpacity>

      {/* Render list of item names */}
      <FlatList
        data={itemNames}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />

      {/* Input field for new price */}
      <TextInput
        placeholder="Enter new price"
        value={newPrice}
        onChangeText={setNewPrice}
        keyboardType="numeric"
        style={styles.priceInput}
      />

      {/* Button to update price */}
      <TouchableOpacity style={styles.updatePriceButton} onPress={handleUpdatePrice}>
        <Text style={styles.updatePriceButtonText}>Update Price</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminPrice;
