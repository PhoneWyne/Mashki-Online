// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles';
// import { Button } from 'react-native';

// const AdminInflows = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       // Fetch orders from the server
//       // gets all the orders stored in the database
//       const response = await fetch('http://192.168.100.57:5000/orders');
//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data.orders);
//       } else {
//         console.error('Failed to fetch orders:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter delivered orders
//   const deliveredOrders = orders.filter(order => order.delivered === 'true');
  
//   // Filter undelivered orders
//   const undeliveredOrders = orders.filter(order => order.delivered !== 'false');

//   // renders the orders as a list
//   const renderOrderItem = ({ item }) => (
//     <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//       <Text>Order ID: {item.id}</Text>
//       <Text>Customer Name: {item.customerName}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, flexDirection: 'row' }}>
//       <View style={{ flex: 1, padding: 20 }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Delivered Orders</Text>
//         {loading ? (
//           <Text>Loading...</Text>
//         ) : (
//           <FlatList
//             data={deliveredOrders}
//             renderItem={renderOrderItem}
//             keyExtractor={item => item.id.toString()} // Assuming each order has a unique ID
//           />
//         )}
//       </View>
//       <View style={{ flex: 1, padding: 20 }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Undelivered Orders</Text>
//         {loading ? (
//           <Text>Loading...</Text>
//         ) : (
//           <FlatList
//             data={undeliveredOrders}
//             renderItem={renderOrderItem}
//             keyExtractor={item => item.id.toString()} // Assuming each order has a unique ID
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default AdminInflows;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Button } from 'react-native';
import {Header} from '../../components';
// Picker is from separate library
import {Picker} from '@react-native-picker/picker';

const AdminInflows = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       // Fetch all orders from the server
//       const response = await fetch('http://192.168.100.57:5000/admininflows');
//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data.orders);
//       } else {
//         console.error('Failed to fetch orders:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Renders each order item
//   const renderOrderItem = ({ item }) => (
//     <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//       <Text>Order ID: {item.id}</Text>
//       <Text>Customer Name: {item.customerName}</Text>
//       {/* Add more details as needed */}
//     </View>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>All Orders</Text>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={orders}
//           renderItem={renderOrderItem}
//           keyExtractor={item => item.id.toString()} // Assuming each order has a unique ID
//         />
//       )}
//     </View>
//   );
// };
  const [orders, setOrders] = useState([]);
  const [selectedArea, setSelectedArea] = useState("All");

  useEffect(()=>{
    fetchCustomerOrders();
    console.log("Successfully set states of orders :", orders);
  }, [selectedArea]);

  // fetches the orders from the database
  const fetchCustomerOrders = async () =>{
    try {
        let url = 'http://192.168.95.207:5000/transport';
        if (selectedArea !== 'All'){
          url+= `/${selectedArea}`;
        }
        const response = await fetch(url);
        if(!response.ok){
          console.error("Error fetching data");
        }
        const data  = await response.json();
        console.log("Successfull fetched data ", data);
        setOrders(data);
    } catch (error) {
        console.error('Error during cart data:', error);
    }
  };

  return(
    <View style={styles.bodyContainer}>
      <Header header="Order's List"/>
      {/* <Picker 
        selectedValue={selectedArea}
        onValueChange={(itemValue) => setSelectedArea(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Lahore" value="Lahore" />
        <Picker.Item label="Karachi" value="Karachi" />
      </Picker>                */}
        {/* added this to support scrolling */}
      <ScrollView style={styles.orderContainer}>
        {orders.map(order => (
          <View key={order._id} style={styles.orderItem}>
            <Text style={styles.orderText}>Customer Phone Number: {"0"+order.phoneNumber}</Text>
            <Text style={styles.orderText}>Quantity: {order.qty}</Text>
            <Text style={styles.orderText}>Area: {order.area}</Text>
            <Text> 
                Delivery Status: {order.delivered ? 'Delivered':'Not Delivered'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



export default AdminInflows;
