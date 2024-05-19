import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Header} from '../../components';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
export const OrderCompleted = ({route}) => {
  const {phoneNumber} = route.params || {};
  const navigation = useNavigation();
  return (
    <View style={styles.bodyContainer}>
      <Header header="Order Completed" />
      <View>
        <Text style={styles.orderId}>Order Id: 0123457</Text>
        <Image
          source={require('../../../assets/order_complete.png')}
          style={styles.imgStyle}
        />
        <View style={styles.orderSummary}>
          <Text style={styles.orderStatusHeader}>Order Successful</Text>
          <Text style={styles.orderDescription}>
            Your refill bottle order has been placed and is on its way! Stay
            tuned for delivery updates, and thank you for choosing
            sustainability
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('Home',{phoneNumber})}>
          <Text style={styles.btnText}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle2}
          onPress={() => navigation.navigate('TrackOrder',{phoneNumber})}>
          <Text style={styles.btnText2}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
