import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {BankCard, Header} from '../../components';
import {useNavigation} from '@react-navigation/native';
export const Checkout = ({route}) => {
  const {phoneNumber} = route.params || {};
  const navigation = useNavigation();
  const data = Array.from({length: 3}, (_, index) => ({key: String(index)}));
  return (
    <View style={styles.bodyContainer}>
      <Header header="Checkout" />

      <View style={styles.addressContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Delivery Address</Text>
          <Text style={styles.change}>Change</Text>
        </View>
        <View style={styles.addressStyle}>
          <Text style={styles.addressText}>
            Utibe Inyang 2 Sena Street, Ajao Lagos.
          </Text>
          <Text style={styles.addressText}> 08120076547</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.paymentText}>Payment </Text>
          <Text style={styles.addCardText}>+ Add New Card</Text>
        </View>
      </View>
      <View style={styles.cardDisplay}>
        <FlatList
          data={data}
          renderItem={({item, index}) => <BankCard index={index} />}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.chargesContainer}>
        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>Subtotal</Text>
          <Text style={styles.chargesTextStyle}>Rs. 300</Text>
        </View>

        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>Delivery</Text>
          <Text style={styles.chargesTextStyle}>Rs. 150</Text>
        </View>
        <View style={styles.chargesFieldStyle}>
          <Text style={styles.chargesTextStyle}>Total</Text>
          <Text style={styles.chargesTextStyle}>Rs. 450</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('OrderCompleted',{phoneNumber})}>
          <Text style={styles.btnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
