import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Button } from 'react-native';



import { Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';
import {PhoneField} from '../../components';
import {HiddenIconSvg} from '../../SVGIcons';
import {scale} from '../../utils';
import {COLORS} from '../../constants';



  
const SignupChoice = () => {
  const navigation = useNavigation();

  const customerChoiceLink = () => {
    // Navigate to another page (replace 'AnotherPage' with the name of your desired page)
    navigation.navigate('Signup');
  };
  const transporterChoiceLink = () => {
    navigation.navigate('TransporterSignup');
  };
  const theme = 'light';
  const colors =
    theme === 'dark'
      ? {text: COLORS.text_dark, bg: COLORS.bg_dark}
      : {
          heading: COLORS.text_primary_light,
          text: COLORS.text_secondary_light,
          bg: COLORS.bg_light,
        };

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Mashki</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: scale(18),
              fontWeight: '400',
              color: colors.text,
              textAlign: 'center',
            }}>
            Are you a Customer or Delivery Rider?
          </Text>
        </View>
      </View>
      <View style={{marginBottom: scale(50), marginTop: scale(175)}}>
        <TouchableOpacity style={styles.button} onPress={customerChoiceLink}>
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: scale(50), marginTop: scale(85)}}>
        <TouchableOpacity style={styles.button} onPress={transporterChoiceLink}>
          <Text style={styles.buttonText}>Delivery Rider</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Customer" onPress={customerChoiceLink} /> */}
      {/* <Button title="View inflows and outflows" onPress={inflowOutflowLink} /> */}
    </View>
  );
};

export default SignupChoice;