import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Signup,
  SplashScreen,
  OTPScreen,
  EnterDetails,
  EnterPassword,
  HomeScreen,
  Cart,
  OrderCompleted,
  Checkout,
  TrackOrder,
} from './src/screens';
import orderhistory from './src/screens/OrderHistory/orderhistory';
import EditAddress from './src/screens/EditAddress/editaddress';
import Feedback from './src/screens/Feedback/feedback';
import AdminHome from './src/screens/AdminHome/adminhome';
import AdminPrice from './src/screens/AdminPrice/adminprice';
import AdminZoneManagement from './src/screens/AdminZoneManagement/adminzonemanagement';
import TransporterHome from './src/screens/TransporterHome/transporterhome';
import AdminInflows from './src/screens/AdminInflows/admininflows';
import AdminAddPlant from './src/screens/AdminAddPlant/adminaddplant';
import AdminAddLaboratory from './src/screens/AdminAddLaboratory/adminaddlaboratory';
import SignupChoice from './src/screens/SignupChoice/signupchoice';
import TransporterSignup from './src/screens/TransporterSignup/transportersignup';
import LabHome from './src/screens/LabHome/labhome';
import EnterTestResults from './src/screens/EnterTestResults/testresults';
import SendTestingInfo from './src/screens/SendTestingInfoToLab/sendtestinginfo';
import ReceiveTestingInfo from './src/screens/LabHome/receivetestinginfo';
import PlantHome from './src/screens/PlantHome/planthome';

const Stack = createStackNavigator();

const App = () => {
  const [isSplashActive, setIsSplashActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isSplashActive ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}
          initialRouteName="Login">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EnterTestResults" component={EnterTestResults} />
          <Stack.Screen name="SendTestingInfo" component={SendTestingInfo} />
          <Stack.Screen name="ReceiveTestingInfo" component={ReceiveTestingInfo} />
          <Stack.Screen name="LabHome" component={LabHome} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Details" component={EnterDetails} />
          <Stack.Screen name="Password" component={EnterPassword} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen name="OrderHistory" component={orderhistory} />
          <Stack.Screen name="EditAddress" component={EditAddress} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="AdminPrice" component={AdminPrice} />
          <Stack.Screen name="AdminZoneManagement" component={AdminZoneManagement} />
          <Stack.Screen name="TransporterHome" component={TransporterHome} />
          <Stack.Screen name="AdminInflows" component={AdminInflows} />
          <Stack.Screen name="AdminAddPlant" component={AdminAddPlant} />
          <Stack.Screen name="AdminAddLaboratory" component={AdminAddLaboratory} />
          <Stack.Screen name="SignupChoice" component={SignupChoice} />
          <Stack.Screen name="TransporterSignup" component={TransporterSignup} />
          <Stack.Screen name="PlantHome" component={PlantHome} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
