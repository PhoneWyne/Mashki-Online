import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../../../assets/logo.png')} // Adjust the path if needed
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D0FE', // Replace with the color from your Figma design
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 206, // Adjust to match the size in your Figma design
    height: 173, // Adjust to match the size in your Figma design
    resizeMode: 'contain',
  },
});
