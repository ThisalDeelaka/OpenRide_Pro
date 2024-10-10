import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/user/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QRScannerScreen from "../screens/user/QRScannerScreen";

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
            iconName = focused ? "qr-code-outline" : "qr-code-outline";  // QR code icon
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: "#175E5E",  // Teal color for active icons
        tabBarInactiveTintColor: "#A0AEC0",  // Soft gray for inactive icons
        tabBarShowLabel: false,  // Hide label for a clean look
        tabBarStyle: {
          backgroundColor: "#F0F4F8",  // Slightly darker background for navbar
          height: 70,  // Height of the navbar
          paddingBottom: insets.bottom + 10,  // Padding for safe area
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },  // Subtle shadow for floating effect
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 15,  // Elevation for Android devices
        },
        tabBarIconStyle: {
          marginBottom: route.name === "Ride" ? -10 : 0, // Slightly lift central QR code button
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,  // Hides the header for the Home screen
        }}
      />
      
      {/* Central Floating Ride Button */}
      <Tab.Screen
        name="QRScannerScreen"
        component={QRScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 20,  // Float the button above the navbar
                height: 70,
                width: 70,
                borderRadius: 35,
                backgroundColor: "#175E5E",  // Central button teal color
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 15,  // Elevation for Android
              }}
            >
              <Ionicons name="qr-code-outline" size={32} color="#FFF" />
            </View>
          ),
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
