// AdminHome.js

import React from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const PlantHome = () => {
  const navigation = useNavigation();

  // const pricePageLink = () => {
  //   navigation.navigate('AdminPrice');
  // };
  // const zoneManageLink = () => {
  //   navigation.navigate('AdminZoneManagement');
  // };
  // const inflowOutflowLink = () => {
  //   navigation.navigate('AdminInflows');
  // };
  // const addWaterPlantLink = () => {
  //   navigation.navigate('AdminAddPlant');
  // };
  // const addLabLink = () => {
  //   navigation.navigate('AdminAddLaboratory');
  // };
  // const sendTestingInfoLink = () => {
  //   navigation.navigate('SendTestingInfo');
  // };

  const handleSignOut = () => {
    navigation.navigate('Login');
    // link to signup page
  };

  const homePageLink = () => {
    navigation.navigate('PlantHome');
    // link to home page
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerColor}>
        <View style={styles.headerContainerStyle}>
          <Button title="Home" onPress={homePageLink} />
          <View />
          <Text style={styles.titleStyle}>Plant Home</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <View style={styles.iconStyle}>
              <Image
                source={require('../../../assets/signout.png')}
                style={{ width: 20, height: 22, tintColor: 'white' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Plant Home</Text>
        {/* <Button title="Price change" onPress={pricePageLink} />
        <Button title="View inflows and outflows" onPress={inflowOutflowLink} />
        <Button title="Add Water Plant" onPress={addWaterPlantLink} />
        <Button title="Add Laboratory" onPress={addLabLink} />
        <Button title="Zone Adjustments" onPress={zoneManageLink} />
        <Button title="Send Testing Information to Lab" onPress={sendTestingInfoLink} /> */}
      </View>
    </View>
  );
};

export default PlantHome;
