import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {scale} from '../../utils';

export const BankCard = ({index}) => {
  const colors = ['#EB7777', '#8688BC', '#7AA0DA'];
  return (
    <View style={[styles.card, {backgroundColor: colors[index]}]}>
      <Image source={require('../../../assets/visa.png')} style={styles.logo} />
      <View style={styles.cardNumber}>
        <Text style={styles.cardNumberText}>**** **** **** 3282</Text>
      </View>
      <View style={styles.cardNameExpiry}>
        <Text>Card Holder</Text>
        <Text>Expires</Text>
      </View>
      <View style={styles.cardNameExpiry}>
        <View style={styles.cardHolder}>
          <Text style={styles.cardHolderText}>Utibe Inyang</Text>
        </View>
        <View style={styles.expirationDate}>
          <Text style={styles.expirationDateText}>{index + 1}/23</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: scale(20),
  },
  cardNumber: {
    marginTop: scale(20),
    marginHorizontal: scale(17),
    marginBottom: scale(22),
  },
  logo: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
    marginLeft: scale(17),
    marginTop: scale(10),
  },
  cardNameExpiry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(17),
  },
  cardNumberText: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: scale(7),
  },
  expirationDate: {
    marginBottom: scale(17),
  },
  cardHolderText: {
    fontSize: scale(14),
    color: 'white',
  },

  expirationDateText: {
    fontSize: scale(14),
    color: 'white',
  },
});
