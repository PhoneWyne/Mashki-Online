/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../constants';
import {LeftArrowSvg} from '../../SVGIcons';
import {scale} from '../../utils';
import {styles} from './style';


export const EnterDetails = ({route}) => {
  const {phoneNumber} = route.params || {};
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [area, setArea] = useState('');
  const [hnum, setHnum] = useState('');
  const [det1, setDet1] = useState('');
  const theme = 'light';
  const colors =
    theme === 'dark'
      ? {text: COLORS.text_light, bg: COLORS.bg_dark}
      : {
          heading: COLORS.text_primary_light,
          text: COLORS.text_secondary_light,
          bg: COLORS.bg_light,
        };

  const navigation = useNavigation();

  useEffect(() => {
    console.log("phone num on enter details screen is", phoneNumber);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior as needed
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: colors.bg}}>
          <View style={{marginHorizontal: scale(30), marginTop: scale(50)}}>
            <LeftArrowSvg
              SvgHeight={scale(20)}
              SvgWidth={scale(11.78)}
              fillColor={colors.text}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(30),
              marginLeft: scale(20),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: scale(22),
                fontWeight: 'bold',
                color: colors.heading,
                textAlign: 'center',
              }}>
              Enter your Details
            </Text>
            <Text
              style={{
                fontSize: scale(18),
                fontWeight: '400',
                color: colors.text,
                textAlign: 'center',
              }}>
              Fresh water delivered to your doorstep
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Image source={require('../../../assets/details_bg.png')} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginLeft: scale(38),
              marginRight: scale(38),
              marginTop: scale(10),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              First Name
            </Text>
            <View style={{height: scale(60)}}>
              <TextInput
                backgroundColor={colors.bg}
                placeholder="Enter your first name"
                placeholderTextColor="#A5AAB7"
                keyboardType="default"
                value={firstname}
                onChangeText={text => setFirstname(text)}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  paddingLeft: scale(10),
                  borderWidth: 1,
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: '#D9D9D9',
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(20),
              marginLeft: scale(38),
              marginRight: scale(38),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              Last Name
            </Text>
            <View style={{height: scale(60)}}>
              <TextInput
                backgroundColor={colors.bg}
                placeholder="Enter your last name"
                placeholderTextColor="#A5AAB7"
                keyboardType="default"
                value={lastname}
                onChangeText={text => setLastname(text)}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  paddingLeft: scale(10),
                  borderWidth: 1,
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: '#D9D9D9',
                }}
              />
            </View>
          </View>
          
          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(30),
              marginLeft: scale(38),
              marginRight: scale(38),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              Area
            </Text>
            <View style={{height: scale(60)}}>
              <TextInput
                backgroundColor={colors.bg}
                placeholder="Enter your Area"
                placeholderTextColor="#A5AAB7"
                keyboardType="default"
                value={area}
                onChangeText={text => setArea(text)}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  paddingLeft: scale(10),
                  borderWidth: 1,
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: '#D9D9D9',
                }}
              />
            </View>
          </View>
          
          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(40),
              marginLeft: scale(38),
              marginRight: scale(38),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              House/Bldg Number
            </Text>
            <View style={{height: scale(60)}}>
              <TextInput
                backgroundColor={colors.bg}
                placeholder="Enter your house or bldg number"
                placeholderTextColor="#A5AAB7"
                keyboardType="default"
                value={hnum}
                onChangeText={text => setHnum(text)}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  paddingLeft: scale(10),
                  borderWidth: 1,
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: '#D9D9D9',
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: scale(20),
              marginLeft: scale(38),
              marginRight: scale(38),
            }}>
            <Text style={{color: colors.text, marginVertical: scale(12)}}>
              Other Details
            </Text>
            <View style={{height: scale(60)}}>
              <TextInput
                backgroundColor={colors.bg}
                placeholder="Enter your floor or appt number"
                placeholderTextColor="#A5AAB7"
                keyboardType="default"
                value={det1}
                onChangeText={text => setDet1(text)}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  paddingLeft: scale(10),
                  borderWidth: 1,
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: '#D9D9D9',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: scale(35), marginTop: scale(55)}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Password',{firstname,lastname, phoneNumber,area,hnum,det1})}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
