import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllBikesScreen from "../screens/admin/AllBikesScreen";
import MaintenanceScreen from "../screens/admin/MaintenanceScreen";
import SecurityScreen from "../screens/admin/SecurityScreen";
import DashboardScreen from "../screens/admin/DashboardScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const AdminBottomTabNavigator = () => {
  const insets = useSafeAreaInsets(); // To handle safe area padding

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          // Assigning icons based on the route name
          if (route.name === "AllBikes") {
            iconName = focused ? "bicycle" : "bicycle-outline";
          } else if (route.name === "Maintenance") {
            iconName = focused ? "construct" : "construct-outline";
          } else if (route.name === "Security") {
            iconName = focused ? "shield" : "shield-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          }

          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: "#175E5E", // Match the app's primary color
        tabBarInactiveTintColor: "#A0AEC0", // Soft gray for inactive icons
        tabBarShowLabel: false, // Hide label for a clean look
        tabBarStyle: {
          backgroundColor: "#fff", // White background for contrast
          borderTopLeftRadius: 30, // Rounded top corners for modern look
          borderTopRightRadius: 30,
          position: 'absolute',
          height: 80, // Increase the height for a more spacious design
          paddingBottom: insets.bottom + 10, // Padding for safe area and design
          paddingTop: 10, // Extra padding for elevation effect
          marginHorizontal: 20, // Margin for a floating look
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 }, // Subtle shadow for floating effect
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 15, // Elevation for Android devices
        },
      })}
    >
      {/* Defining the screens for each tab */}
      <Tab.Screen name="AllBikes" component={AllBikesScreen} />
      <Tab.Screen name="Maintenance" component={MaintenanceScreen} />
      <Tab.Screen name="Security" component={SecurityScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default AdminBottomTabNavigator;
