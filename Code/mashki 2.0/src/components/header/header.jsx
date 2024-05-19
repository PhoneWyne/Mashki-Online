import React from 'react';
import {View, Text} from 'react-native';
import {LeftArrowSvg} from '../../SVGIcons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
export const Header = ({header}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View />
        <LeftArrowSvg fillColor={'white'} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{header}</Text>
        <View />
      </View>
    </View>
  );
};
