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
import AllBikesScreen from "../screens/admin/AllBikesScreen"; // Import AllBikesScreen
import AddBicycle from "../screens/owner/AddBicycle"; // Import AddBicycle
import BikeListScreen from "../screens/user/BikeListScreen";
import MaintenanceScreen from "../screens/admin/MaintenanceScreen";
import AddBicycleDetails from "../screens/owner/AddBicycleDetails";
import AddCombinationLock from "../screens/owner/AddCombinationLock";
import GenerateQRCode from "../screens/owner/GenerateQRCode";
import MyBikesScreen from "../screens/owner/MyBikesScreen";

import HomeScreen from "../screens/user/HomeScreen";
import SupportChatScreen from "../screens/incident/SupportChatScreen";
import HistoryScreen from "../screens/user/HistoryScreen";
import FAQScreens from "../screens/user/FAQScreen";
import MyWalletScreen from "../screens/user/MyWalletScreen";




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
        name="MaintenanceReports"
        component={MaintenanceReportsScreen}
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
        name="AddBicycle"
        component={AddBicycle}
        options={{ headerShown: false }}
      />

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
  {/* Navigator components for homepage hamburger menue */}
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ headerShown: false }}
  />

  <Stack.Screen
    name="MyWallet"
    component={MyWalletScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="History"
    component={HistoryScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="FAQ" 
    component={FAQScreens} 
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="SupportChat"
    component={SupportChatScreen}
    options={{ headerShown: false }}
    />
  </Stack.Navigator>
  );
};

export default MainNavigator;
