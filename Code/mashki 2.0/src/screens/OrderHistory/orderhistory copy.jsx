import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default orderhistory = ({ route }) => {
  const { phoneNumber } = route.params || {};
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  // gets the orders stored in the database against the phone number of the user
  const fetchOrders = async () => {
    try {
      // Fetch orders from backend API
      const response = await fetch(`http://192.168.100.57:5000/orders/${phoneNumber}`);
      const data = await response.json();
      setOrders(data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // displays a list of the orders
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>Order ID: {item._id}</Text>
      <Text>Quantity: {item.qty}</Text>
      <Text>Delivered: {item.delivered ? 'Yes' : 'No'}</Text>
    </View>
  );
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

// export default OrderHistory;
