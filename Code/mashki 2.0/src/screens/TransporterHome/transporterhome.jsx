import React, { useState, useEffect } from 'react';
import { View, Text,Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import {Header} from '../../components';
// Picker is from separate library
import {Picker} from '@react-native-picker/picker';

const TransporterHome = ({}) =>{
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

  // function fired when button is pressed to update delivery status
  // changes the delivery status in the database and fetches the orders again to update the screen
  const handleDeliveryStatusUpdate = async (id, delivered) =>{
    try{
        const response = await fetch(`http://192.168.95.207:5000/transport/${id}/updateDeliveryStatus`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            // flip/NOT the current delivered value, and send it to db
            body: JSON.stringify({ delivered }),
        });
        console.log("Updating customer order status")
        fetchCustomerOrders();
    } catch (error){
        console.error('Error during cart data:', error);
    }   
  };
 
  return(
      
      <View style={styles.bodyContainer}>
          <Header header="Order's List"/>
          <Picker 
            selectedValue={selectedArea}
            onValueChange={(itemValue) => setSelectedArea(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Karachi" value="Karachi" />
          </Picker>               
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
                    <Button
                        title={order.delivered ? 'Mark as Undelivered': 'Mark as Delivered'}
                        onPress={()=>handleDeliveryStatusUpdate(order._id, order.delivered )}
                    />
                </View>
            ))}
          </ScrollView>
      </View>
    );
};

export default TransporterHome;
