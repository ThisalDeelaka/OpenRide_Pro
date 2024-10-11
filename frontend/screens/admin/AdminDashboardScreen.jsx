import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

const DrawerMenu = ({ visible, onClose, navigation }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 flex-row">
        {/* Sidebar Drawer */}
        <View className="w-64 bg-white h-full p-6 shadow-lg">
          <TouchableOpacity onPress={onClose} className="mb-6">
            <Ionicons name="close" size={30} color="#175E5E" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-[#175E5E] mb-6">Menu</Text>

          {/* Drawer Menu Items */}
          {[
            { name: "AllBikes", icon: "bicycle", label: "All Bikes" },
            { name: "Notifications", icon: "notifications-outline", label: "Notifications" },
            { name: "Security", icon: "shield-checkmark-outline", label: "Security" },
            { name: "AdminMaintain", icon: "construct-outline", label: "Maintenance" },
            { name: "AllUsers", icon: "people-outline", label: "All Users" },
            { name: "AllOwners", icon: "business-outline", label: "All Owners" },
            { name: "Fields", icon: "leaf-outline", label: "Fields" },
            {name: "AdminSupportChat", icon: "chatbox-ellipses-outline", label: "Support Chat"},
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center mb-5" 
              onPress={() => {
                onClose(); // Close the drawer
                navigation.navigate(item.name); // Navigate to the appropriate screen
              }}
              style={{ shadowOpacity: 0.3, shadowRadius: 4 }}
            >
              <Ionicons name={item.icon} size={24} color="#175E5E" />
              <Text className="ml-4 text-lg text-[#333]">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overlay to close the drawer */}
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
};

const AdminDashboardScreen = ({ navigation }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/admin/analytics");
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        Alert.alert("Error", "Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#175E5E" />
        <Text className="mt-3 text-lg text-gray-600">Loading data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      {/* Drawer Menu Overlay */}
      <DrawerMenu visible={isDrawerVisible} onClose={() => setDrawerVisible(false)} navigation={navigation} />

      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>
        <Text className="text-4xl font-bold text-[#175E5E]">Admin Dashboard</Text>
      </View>

      {/* Stats Overview with Flex Wrap */}
      <View className="flex-row flex-wrap space-x-4 justify-between mb-6">
        {[ // Adjust the width of each card slightly to prevent cut-off
          { title: "Total Users", value: analytics.totalUsers },
          { title: "Total Bikes", value: analytics.totalBikes },
          { title: "Total Rides", value: analytics.totalRides }
        ].map((stat, index) => (
          <View key={index} className="bg-white p-6 rounded-lg w-[30%] items-center shadow-md">
            <Text className="text-lg font-bold text-gray-800">{stat.title}</Text>
            <Text className="text-2xl text-[#175E5E]">{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* Revenue and Incidents sections */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-bold text-gray-800">Total Revenue</Text>
        <Text className="text-2xl text-[#175E5E]">${analytics.totalRevenue}</Text>
      </View>

      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-bold text-gray-800">Pending Incidents</Text>
        <Text className="text-2xl text-[#175E5E]">{analytics.totalIncidents}</Text>
      </View>

      {/* Bikes Under Maintenance section */}
      <View className="bg-white p-6 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800">Bikes Under Maintenance</Text>
        <Text className="text-2xl text-[#175E5E]">{analytics.bikesUnderMaintenance}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;
