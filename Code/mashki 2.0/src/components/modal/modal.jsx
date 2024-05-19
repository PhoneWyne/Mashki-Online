/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

export const ModalView = ({
  modalVisible,
  setModalVisible,
  nextScreen,
  headingText,
  bodyText,
}) => {
  const navigation = useNavigation();
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate(`${nextScreen}`);
            }}>
            <Image
              source={require('../../../assets/checkmark.png')}
              style={styles.checkmarkImage}
            />
          </TouchableOpacity>
          <Text style={styles.modalTextTitle}> {headingText}</Text>
          <Text style={styles.modalTextSubtitle}>{bodyText}</Text>
        </View>
      </View>
    </Modal>
  );
};
