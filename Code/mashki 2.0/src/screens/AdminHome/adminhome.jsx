// // AdminHome.js

// import React from 'react';
// import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles';

// const AdminHome = () => {
//   const navigation = useNavigation();

//   const pricePageLink = () => {
//     navigation.navigate('AdminPrice');
//   };
//   const zoneManageLink = () => {
//     navigation.navigate('AdminZoneManagement');
//   };
//   const inflowOutflowLink = () => {
//     navigation.navigate('AdminInflows');
//   };
//   const addWaterPlantLink = () => {
//     navigation.navigate('AdminAddPlant');
//   };
//   const addLabLink = () => {
//     navigation.navigate('AdminAddLaboratory');
//   };
//   const sendTestingInfoLink = () => {
//     navigation.navigate('SendTestingInfo');
//   };
//   // link to login page
//   const handleSignOut = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.bodyContainer}>
//       <View style={styles.headerColor}>
//         <View style={styles.headerContainerStyle}>
//           <View />
//           <Text style={styles.titleStyle}>Admin Home</Text>
//           <TouchableOpacity onPress={handleSignOut}>
//             <View style={styles.iconStyle}>
//               <Image
//                 source={require('../../../assets/signout.png')}
//                 style={{ width: 20, height: 22, tintColor: 'white' }}
//               />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {/* <Text>Welcome to Admin Screen</Text> */}
//         <Button title="Price change" onPress={pricePageLink} />
//         <Button title="View inflows and outflows" onPress={inflowOutflowLink} />
//         <Button title="Add Water Plant" onPress={addWaterPlantLink} />
//         <Button title="Add Laboratory" onPress={addLabLink} />
//         <Button title="Zone Adjustments" onPress={zoneManageLink} />
//         <Button title="Send Testing Information to Lab" onPress={sendTestingInfoLink} />
//       </View>
//     </View>
//   );
// };

// export default AdminHome;



import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const AdminHome = () => {
  const navigation = useNavigation();

  const options = [
    { title: 'Price Change', color: '#FF6347', onPress: () => navigation.navigate('AdminPrice') },
    { title: 'View Inflows and Outflows', color: '#32CD32', onPress: () => navigation.navigate('AdminInflows') },
    { title: 'Add Water Plant', color: '#6495ED', onPress: () => navigation.navigate('AdminAddPlant') },
    { title: 'Add Laboratory', color: '#FF69B4', onPress: () => navigation.navigate('AdminAddLaboratory') },
    { title: 'Zone Adjustments', color: '#FFA500', onPress: () => navigation.navigate('AdminZoneManagement') },
    { title: 'Send Testing Information to Lab', color: '#00BFFF', onPress: () => navigation.navigate('SendTestingInfo') },
  ];

  const renderButton = (title, color, onPress) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerColor}>
        <View style={styles.headerContainerStyle}>
          <View />
          <Text style={styles.titleStyle}>Admin Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.iconStyle}>
              <Image
                source={require('../../../assets/signout.png')}
                style={{ width: 20, height: 22, tintColor: 'white' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.gridContainer}>
          {options.map(({ title, color, onPress }, index) => (
            <View style={styles.gridItem} key={index}>
              {renderButton(title, color, onPress)}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AdminHome;
