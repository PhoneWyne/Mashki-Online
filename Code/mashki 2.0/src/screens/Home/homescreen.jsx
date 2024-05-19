import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export const HomeScreen = ({ route }) => {
  const { phoneNumber } = route.params || {};
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // fetches the price of the products being sold on the app
  const fetchPrice = async () => {
    try {
      const response = await fetch(`http://192.168.95.207:5000/price/12LitersRefill`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPrice(data.price);
      } else {
        console.error('Failed to fetch price:', response.status);
      }
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };
  

  useEffect(() => {
    fetchPrice(); 
  }, []);

  // handles increase in quantity
  const handleAddPress = () => {
    setQty(qty + 1);
  };

  // handles decrease in quantity
  const handleRemovePress = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  // link to login page
  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  // handles the display of dropdown menu
  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  // link to orderhistory page
  const handleMenuButton1Press = () => {
    navigation.navigate('OrderHistory', { phoneNumber });
    setMenuVisible(false);
  };

  // link to edit address page
  const handleMenuButton2Press = () => {
    navigation.navigate('EditAddress', { phoneNumber });
    setMenuVisible(false);
  };

  // link to feedback page
  const handleMenuButton3Press = () => {
    navigation.navigate('Feedback', { phoneNumber });
    setMenuVisible(false);
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerColor}>
        <View style={styles.headerContainerStyle}>
          <View />
          <TouchableOpacity onPress={handleMenuPress}>
            <View style={styles.iconStyle}>
              <Image
                source={require('../../../assets/menu_icon.png')}
                style={{ width: 20, height: 22 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleStyle}>Welcome Back</Text>
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
      <View style={styles.mainContainer}>
        <View style={styles.imgStyle}>
          <Image source={require('../../../assets/bottle.png')} />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemHeading}>12 Liters Refill</Text>
          <Text style={styles.itemPrice}>Rs {price}</Text>
          <Text style={styles.itemDescription}>
            Easily carry and refill with our 12L bottle, a practical alternative
            to heavier options. Ideal for dispensers and upper-floor access
            without the bulk.
          </Text>
        </View>

        <View style={styles.cartButtonContainer}>
          <Text style={styles.qtyHeader}>Quantity</Text>
          <View style={styles.cartButton}>
            <TouchableOpacity onPress={handleRemovePress}>
              <Image source={require('../../../assets/remove.png')} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity onPress={handleAddPress}>
              <Image source={require('../../../assets/add.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handleMenuButton1Press}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Order History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuButton2Press}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Edit Address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuButton3Press}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Give Feedback</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.btnContainerStyle}>
        <TouchableOpacity
          style={styles.btnStyle}
          disabled={qty === 0}
          onPress={() => navigation.navigate('Cart', { phoneNumber, qty, price })}
        >
          {qty !== 0 && (
            <View style={styles.btnQtyText}>
              <Text style={styles.btnPriceText}>{qty}</Text>
            </View>
          )}
          {qty !== 0 ? (
            <Text style={styles.btnText}>View Cart</Text>
          ) : (
            <Text style={styles.btnText2}>Add to Cart</Text>
          )}
          {qty !== 0 && <Text style={styles.btnPriceText}>Rs. {qty * price}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

