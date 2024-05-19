import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
const LabHome = () => {
  const navigation = useNavigation()

  const receiveTestingInfo = () => {
    navigation.navigate('ReceiveTestingInfo');
  };

  const enterTestResults = () => {
    navigation.navigate('EnterTestResults');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Lab Home Screen</Text>
      <Button title="Receive Testing Info" onPress={receiveTestingInfo} />
      <Button title="Enter Test Results" onPress={enterTestResults} />
    </View>
  );
};

export default LabHome;
