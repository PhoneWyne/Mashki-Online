import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Header} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
const icons = ['shopping-cart', 'cube', 'train', 'map-pin'];
const labels = [
  'Order Made',
  'Order Received',
  'Out for Delivery',
  'My Location',
];
const customStyles = {
  stepIndicatorSize: 59,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};
export const TrackOrder = ({route}) => {
  const {phoneNumber} = route.params || {};
  return (
    <View style={styles.bodyContainer}>
      <Header header="Track Order" />
      <View>
        <Text style={styles.orderId}>Order Id: 0123457</Text>
        <View style={styles.deliveryBtnStyle}>
          <Text style={styles.deliveryBtnText}>Estimated Time of Delivery</Text>
          <Text style={styles.deliveryBtnText}>45 minutes</Text>
        </View>
      </View>

      <View style={{marginTop: 30}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={0}
          labels={labels}
          renderStepIndicator={({position, stepstatus}) => (
            <Icon name={icons[position]} size={30} color="#900" />
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnText}>Call Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle2}>
          <Text style={styles.btnText2}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
