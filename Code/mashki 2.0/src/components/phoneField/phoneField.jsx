/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {PhoneSvg} from '../../SVGIcons';
import {scale} from '../../utils';
const data = [
  {label: '+92', value: '+92'},
  {label: '+01', value: '+01'},
  {label: '+43', value: '+43'},
  {label: '+53', value: '+53'},
  {label: '+63', value: '+63'},
  {label: '+73', value: '+73'},
  {label: '+83', value: '+83'},
  {label: '+03', value: '+03'},
  {label: '+13', value: '+13'},
  {label: '+33', value: '+33'},
];

export const PhoneField = ({phone, setPhoneNumber, colors}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        height: scale(60),
        flexDirection: 'row',
        marginHorizontal: scale(38),
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
      }}>
      <View style={{flex: 1, height: scale(60)}}>
        <Dropdown
          containerStyle={{backgroundColor: colors.bg}}
          style={{
            height: '100%',
            width: '100%',
            paddingRight: scale(8),
          }}
          placeholderStyle={{
            paddingLeft: scale(15),
            color: '#A5AAB7',
            fontSize: scale(14),
          }}
          selectedTextStyle={{
            color: colors.text,
            paddingLeft: scale(15),
            fontSize: scale(14),
          }}
          iconStyle={{backgroundColor: colors.bg}}
          data={data}
          itemContainerStyle={{backgroundColor: colors.bg}}
          itemTextStyle={{color: colors.text}}
          maxHeight={300}
          activeColor="grey"
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '+92' : '+92'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: '#D9D9D9',
          marginVertical: scale(10),
          marginRight: scale(10),
          flexDirection: 'row',
        }}
      />
      <TextInput
        placeholder={'Enter your mobile number'}
        placeholderTextColor="grey"
        keyboardType="numeric"
        value={phone}
        onChangeText={text => setPhoneNumber(text)}
        style={{
          color: colors.text,
          flex: 2.4,
          height: scale(60),
          fontSize: scale(14),
          paddingLeft: scale(10),
          width: '100%',
        }}
      />
      <View style={{alignSelf: 'center', paddingRight: scale(20)}}>
        <PhoneSvg />
      </View>
    </View>
  );
};

export default PhoneField;
