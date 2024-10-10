import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api";
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);

  // Fetch the list of bikes from the server
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await api.get("/bikes");
        // Ensure the response contains data and is an array
        if (response.data && Array.isArray(response.data)) {
          setBikes(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
        Alert.alert("Error", "Failed to load bikes");
      }
    };

    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5">
      
      {/* Header Section */}
      <View className="mt-5">
        <Text className="text-3xl font-bold text-teal-800">Hello, Matheesha</Text>
        <Text className="text-lg text-gray-500 mt-1">Your nearest bike is waiting!</Text>
      </View>

      {/* Interactive Map */}
      <View className="mt-5 shadow-md rounded-lg overflow-hidden">
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
                  latitude: bike.latitude || 37.78825, // Default if latitude is undefined
                  longitude: bike.longitude || -122.4324, // Default if longitude is undefined
                }}
                title={bike.name || "Unnamed Bike"} // Default if name is undefined
                description={bike.status || "Status unknown"} // Default if status is undefined
                pinColor="#FF7A00" // Custom pin color
              />
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-5">No bikes available</Text>
          )}
        </MapView>
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
