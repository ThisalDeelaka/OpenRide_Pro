import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"; // Import SignUpScreen
import BottomTabNavigator from "./BottomTabNavigator";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import MaintenanceReportsScreen from "../screens/MaintenanceReportsScreen";
import AdminBottomTabNavigator from "./AdminBottomTabNavigator";
import OwnerBottomTabNavigator from "./BikeOwnerTabNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen 
        name="Home" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AdminNav" component={AdminBottomTabNavigator} />
      <Stack.Screen name="OwnerNav" component={OwnerBottomTabNavigator} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="MaintenanceReports" component={MaintenanceReportsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
