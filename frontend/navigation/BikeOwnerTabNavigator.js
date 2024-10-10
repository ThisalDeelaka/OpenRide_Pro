import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/OwnerProfileScreen';
import MyBikesScreen from '../screens/MyBikesScreen';
import WalletsScreen from '../screens/WalletsScreen';
import DashboardScreen from '../screens/OwnerDashboardScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BikeOwnerTabNavigator = () => {
  const insets = useSafeAreaInsets(); // For safe area padding

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'My Bikes') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'Wallets') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          }

          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: '#175E5E', // Active color
        tabBarInactiveTintColor: '#A0AEC0', // Inactive color
        tabBarShowLabel: false, // Hide label for clean look
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          height: 80,
          paddingBottom: insets.bottom + 10,
          paddingTop: 10,
          marginHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 15,
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="My Bikes" component={MyBikesScreen} />
      <Tab.Screen name="Wallets" component={WalletsScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default BikeOwnerTabNavigator;
