import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"; // Import SignUpScreen
import BottomTabNavigator from "./BottomTabNavigator";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import MaintenanceReportsScreen from "../screens/incident/MaintenanceReportsScreen";
import AdminBottomTabNavigator from "./AdminBottomTabNavigator";
import OwnerBottomTabNavigator from "./BikeOwnerTabNavigator";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import AllBikesScreen from "../screens/admin/AllBikesScreen"; 
import BikeListScreen from "../screens/user/BikeListScreen";
import MaintenanceScreen from "../screens/admin/MaintenanceScreen";
import AddBicycleDetails from "../screens/owner/AddBicycleDetails";
import AddCombinationLock from "../screens/owner/AddCombinationLock";
import GenerateQRCode from "../screens/owner/GenerateQRCode";
import MyBikesScreen from "../screens/owner/MyBikesScreen";
import BikeDirectionsScreen from "../screens/user/BikeDirectionsScreen";
import QRCodeScannerScreen from "../screens/user/QRCodeScannerScreen";
import UnlockCodeScreen from "../screens/user/UnlockCodeScreen";
import StartTripScrean from "../screens/user/StartTripScreen";
import SupportChat from "../screens/incident/SupportChat";
import IncidentScreen from "../screens/incident/IncidentScreen";
import AdminRequestsScreen from "../screens/admin/AdminRequestsScreen";
import RideTrackingScreen from "../screens/user/RideTrackingScreen";
import EndTripScreen from "../screens/user/EndTripScreen";
import PaymentScreen from "../screens/user/PaymentScreen";
import BikeDetailsScreen from "../screens/owner/BikeDetailsScreen";



const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Onboarding Screen */}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />

      {/* Login and SignUp Flow */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }} // Hide header for Sign Up if you want
      />

      {/* User and Admin Flow */}
      <Stack.Screen
        name="UserHome"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminNav"
        component={AdminBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OwnerNav"
        component={OwnerBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: false }}
      />
     
      
      <Stack.Screen
        name="NearBikeList"
        component={BikeListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AllBikes" 
        component={AllBikesScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AdminMaintain" 
        component={MaintenanceScreen} 
        options={{ headerShown: false }} 
      />

      {/* bike owner*/}
      

<Stack.Screen 
    name="AddBicycleDetails" 
    component={AddBicycleDetails} 
    options={{ headerShown: false }}  
  />
  <Stack.Screen 
    name="AddCombinationLock" 
    component={AddCombinationLock} 
    options={{ headerShown: false }}  
  />
  <Stack.Screen 
    name="GenerateQRCode" 
    component={GenerateQRCode} 
    options={{ headerShown: false }}  
  />
  <Stack.Screen
        name="MyBikes"
        component={MyBikesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BikeDetails"
        component={BikeDetailsScreen}
        options={{ headerShown: false }}
      />
      {/* rider Flow */}
      <Stack.Screen
        name="BikeDirectionsScreen"
        component={BikeDirectionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRCodeScannerScreen"
        component={QRCodeScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UnlockCodeScreen"
        component={UnlockCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartTripScrean"
        component={StartTripScrean}
        options={{ headerShown: false }}
      />
      <Stack.Screen
    name="RideTrackingScreen"
    component={RideTrackingScreen}
    options={{ headerShown: false }}
    />
    <Stack.Screen
    name="EndTripScreen"
    component={EndTripScreen}
    options={{ headerShown: false }}
    />
    <Stack.Screen
    name="PaymentScreen"
    component={PaymentScreen}
    options={{ headerShown: false }}
    />

{/* incident Flow */}

<Stack.Screen
    name="SupportChat"
    component={SupportChat}
    options={{ headerShown: false }}
    />
<Stack.Screen
    name="MaintenanceReport"
    component={MaintenanceReportsScreen}
    options={{ headerShown: false }}
    />
    <Stack.Screen
    name="IncidentScreen"
    component={IncidentScreen}
    options={{ headerShown: false }}
    />
    
    {/* admin*/}
    <Stack.Screen
    name="Notifications"
    component={AdminRequestsScreen}
    options={{ headerShown: false }}
    />
    </Stack.Navigator>
    
  );
};

export default MainNavigator;
