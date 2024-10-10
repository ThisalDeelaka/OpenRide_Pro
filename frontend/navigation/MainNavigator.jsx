import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"; // Import SignUpScreen
import BottomTabNavigator from "./BottomTabNavigator";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import MaintenanceReportsScreen from "../screens/user/MaintenanceReportsScreen";
import AdminBottomTabNavigator from "./AdminBottomTabNavigator";
import OwnerBottomTabNavigator from "./BikeOwnerTabNavigator";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen"; // Import OnboardingScreen

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
        name="Home" 
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
    </Stack.Navigator>
  );
};

export default MainNavigator;
