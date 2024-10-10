import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
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

          if (route.name === "AdminHome") {
            // Updated to dashboard icon
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "QRScannerScreen") {
            iconName = focused ? "qr-code-outline" : "qr-code-outline";  // QR code icon
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Increase the size of the icons for Home and Profile
          const iconSize = route.name === "AdminHome" || route.name === "Profile" ? (focused ? 32 : 28) : (focused ? 28 : 24);

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: "#175E5E",  // Teal color for active icons
        tabBarInactiveTintColor: "#A0AEC0",  // Soft gray for inactive icons
        tabBarShowLabel: false,  // Hide label for a clean look
        tabBarStyle: {
          backgroundColor: "#B8D8D6",  // Updated background color
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
          marginBottom: route.name === "QRScannerScreen" ? -10 : 0, // Slightly lift central QR code button
        },
      })}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminDashboardScreen}
        options={{
          headerShown: false,  // Hides the header for the Admin Dashboard screen
        }}
      />
      
      {/* Central Floating QR Code Button */}
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
