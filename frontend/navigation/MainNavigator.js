import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
// Remove RideScreen here if it's in BottomTabNavigator
// import RideScreen from "../screens/RideScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import MaintenanceReportsScreen from "../screens/MaintenanceReportsScreen";
import BottomTabNavigator from "./BottomTabNavigator"; // Import BottomTabNavigator

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Optionally hide the header for login
      />
      {/* Pass BottomTabNavigator as a component to the Home screen */}
      <Stack.Screen 
        name="Home" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} // Hide the header for bottom tabs
      />
      {/* You can add other screens like admin dashboard and maintenance */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="MaintenanceReports" component={MaintenanceReportsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
