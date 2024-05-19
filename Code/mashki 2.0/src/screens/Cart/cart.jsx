import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {Header} from '../../components';
import {useNavigation} from '@react-navigation/native';
export const Cart = ({route}) => {
  // [qty, setQty] = useState();
  // const {phoneNumber, qty} = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [qty, setQty] = useState(route.params.qty);
  const [price, setPrice] = useState(route.params.price);
  const handleAddPress = () => {
    setQty(qty + 1);
  };
  const handleRemovePress = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };
  
  const navigation = useNavigation();
  // handles the input of orders
  const handleSubmit = async () => {
    // e.preventDefault();
    try{
      // data is being sent, onSubmit works, posting is failing
      console.log("Data being inserted :", qty);
      // await axios.post('http://10.130.171.105:5000/cart', qty);
      const response = await fetch('http://192.168.95.207:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          qty,
        }),
      });
      if (response.ok) {
        console.log('Data successfully inserted!');
        // navigation.navigate('Checkout');
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Error inserting data: ', error);
    }
    navigation.navigate('Checkout', {phoneNumber});
  };
  return (
    <View style={styles.bodyContainer}>
      <Header header="Cart" />

      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row', columnGap: 20}}>
          <View>
            <Image
              source={require('../../../assets/bottle.png')}
              style={styles.bottleImgStyle}
            />
          </View>
          <View>
            <Text style={styles.itemTextStyle}>19 Liters Refill</Text>
            <Text style={styles.itemPriceStyle}>Rs. {qty * price}</Text>
            <View style={styles.cartButtonContainer}>
              <View style={styles.cartButton}>
                <TouchableOpacity onPress={handleRemovePress}>
                  <Image
                    source={require('../../../assets/remove.png')}
                    style={styles.cartButtonStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity onPress={handleAddPress}>
                  <Image
                    source={require('../../../assets/add.png')}
                    style={styles.cartButtonStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.deleteBtn}>
          <Image source={require('../../../assets/delete.png')} />
        </View>
      </View>
      <View style={styles.chargesContainer}>
        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>Subtotal</Text>
          <Text style={styles.chargesTextStyle}>Rs. {qty * price}</Text>
        </View>

        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>Delivery</Text>
          <Text style={styles.chargesTextStyle}>Rs. 150</Text>
        </View>
        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>VAT</Text>
          <Text style={styles.chargesTextStyle}>Rs. 50</Text>
        </View>
        <View style={styles.voucherContainer}>
          <Image source={require('../../../assets/voucher.png')} />
          <Text style={styles.voucherText}>Apply a Voucher</Text>
        </View>
        <View style={styles.totalContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.totalText}>Total </Text>
            <Text>(incl. VAT and Delivery Charges)</Text>
          </View>
          <Text style={styles.totalText}>Rs. {qty * price + 50 + 150}</Text>
        </View>
      </View>
      <View style={styles.btnContainerStyle}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>Confirm Address and Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
