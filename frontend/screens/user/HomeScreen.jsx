import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Modal } from "react-native"; // Add Modal here
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import api from "../../services/api";


// Drawer menu component rendered as an overlay (sidebar)
const DrawerMenu = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar Drawer */}
        <View className="w-64 bg-white h-full p-5">
          <TouchableOpacity onPress={onClose} className="mb-6">
            <Ionicons name="close" size={30} color="#175E5E" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#175E5E] mb-5">Menu</Text>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons name="wallet-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">My Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">History</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons name="help-circle-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chatbox-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Support Chat</Text>
          </TouchableOpacity>
        </View>
        
        {/* Overlay to close the drawer */}
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
};

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Manage drawer visibility
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the list of bikes from the server
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await api.get("/bikes");
        if (response.data && Array.isArray(response.data)) {
          setBikes(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
        Alert.alert("Error", "Failed to load bikes");
      } finally {
        setLoading(false); // Stop loading when fetching ends
      }
    };

    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5">
      {/* Drawer Menu Overlay */}
      <DrawerMenu visible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

      {/* Header Section */}
      <View className="flex-row justify-between items-center mt-5">
        {/* Hamburger Menu Icon on the left */}
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>

        <View>
          <Text className="text-3xl font-bold text-teal-800">Hello, Matheesha</Text>
          <Text className="text-lg text-gray-500 mt-1">Your nearest bike is waiting!</Text>
        </View>
      </View>

      {/* Interactive Map */}
      <View className="mt-5 shadow-md rounded-lg overflow-hidden">
        {loading ? (
          // Show loading indicator while data is being fetched
          <View className="w-full h-64 justify-center items-center">
            <ActivityIndicator size="large" color="#175E5E" />
          </View>
        ) : (
          <MapView
            className="w-full h-64"
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {bikes.length > 0 ? (
              bikes.map((bike, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: bike.currentLocation.lat || 37.78825,
                    longitude: bike.currentLocation.lng || -122.4324,
                  }}
                  title={bike.name || "Unnamed Bike"}
                  description={bike.status || "Status unknown"}
                  pinColor="#FF7A00"
                />
              ))
            ) : (
              <Text className="text-center text-gray-500 mt-5">No bikes available</Text>
            )}
          </MapView>
        )}
      </View>

      {/* Stats Overview */}
      <View className="flex-row justify-between mt-5">
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <MaterialIcons name="directions-bike" size={24} color="#175E5E" />
          <Text className="text-lg font-bold text-gray-900 mt-2">12 Rides</Text>
          <Text className="text-sm text-gray-500 mt-1">Total Rides</Text>
        </View>
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <Ionicons name="timer-outline" size={24} color="#175E5E" />
          <Text className="text-lg font-bold text-gray-900 mt-2">56 mins</Text>
          <Text className="text-sm text-gray-500 mt-1">Avg. Time</Text>
        </View>
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <Ionicons name="leaf-outline" size={24} color="#175E5E" />
          <Text className="text-lg font-bold text-gray-900 mt-2">9 Kgs</Text>
          <Text className="text-sm text-gray-500 mt-1">CO2 Saved</Text>
        </View>
      </View>

      {/* Start Ride Button */}
      <TouchableOpacity
        className="bg-[#175E5E] p-4 rounded-lg shadow-lg mt-8 mb-8"
        onPress={() => navigation.navigate("NearBikeList", { bikes })}
      >
        <Text className="text-center text-white text-lg font-bold">Start Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
