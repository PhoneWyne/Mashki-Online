import React, { useState, useEffect } from 'react';
import { View, Text,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import {Header} from '../../components';

export default orderhistory = ({ route }) => {
  const { phoneNumber } = route.params || {};
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
    console.log("Successfully set states of orders :", orders);
  }, []);

  // gets the orders stored in the database against the phone number of the user
  const fetchOrders = async () => {
    try {
      console.log(phoneNumber);
      // Fetch orders from backend API
      const response = await fetch(`http://192.168.95.207:5000/orders/${phoneNumber}`);
      const data = await response.json();
      console.log("Successfull fetched customer order history data ", data);
      setOrders(data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  return (
    <View style={styles.bodyContainer}>
      <Header header="Order's List"/>
      <ScrollView style={styles.orderContainer}>
        {orders.map(order=>(
          <View key={order._id} style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {order._id}</Text>
            <Text style={styles.orderText}>Quantity: {order.qty}</Text>
            <Text style={styles.orderText}>Delivered: {order.delivered ? "Yes" : "No"}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// export default OrderHistory;
