import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/user/HomeScreen";
import RideScreen from "../screens/user/RideScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();  // To handle safe area padding

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ride") {
            iconName = focused ? "bicycle" : "bicycle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: "#175E5E",  // Match the app's primary color
        tabBarInactiveTintColor: "#A0AEC0",  // Soft gray for inactive icons
        tabBarShowLabel: false,  // Hide label for a clean look
        tabBarStyle: {
          backgroundColor: "#fff",  // White background for contrast
          borderTopLeftRadius: 30,  // Rounded top corners for modern look
          borderTopRightRadius: 30,
          position: 'absolute',
          height: 80,  // Increase the height for a more spacious design
          paddingBottom: insets.bottom + 10,  // Padding for safe area and design
          paddingTop: 10,  // Extra padding for elevation effect
          marginHorizontal: 20,  // Margin for a floating look
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },  // Subtle shadow for floating effect
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 15,  // Elevation for Android devices
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ride" component={RideScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
