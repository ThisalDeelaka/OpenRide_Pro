import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import * as Location from "expo-location"; // Import Location from expo
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const StartTripScreen = ({ route, navigation }) => {
  const { bikeId } = route.params; // Get bike info passed from the previous screen
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId

  // Retrieve userId from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          setUserId(parsedUserData.id); // Set userId from AsyncStorage
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      }
    };

    getUserId(); // Call the function on component mount
  }, []);

  const handleStartRide = async () => {
    try {
      setIsLoading(true);

      // Get the user's current location (as start location)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location access to start the ride.");
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const startLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      // Check if userId is available
      if (!userId) {
        Alert.alert("Error", "User ID not found.");
        setIsLoading(false);
        return;
      }

      // Send the start ride request to the backend with userId, bikeId, and startLocation
      const response = await api.post("/rides/start", {
        userId, // Include userId in the request
        bikeId,
        startLocation,
      });

      if (response.status === 201) {
        const { rideId } = response.data;
        Alert.alert("Ride Started", "You have successfully started the ride.");

        // Navigate to another screen (e.g., a ride tracking screen) if needed
        navigation.navigate("RideTrackingScreen", { rideId, startLocation });
      } else {
        Alert.alert("Error", "Failed to start the ride.");
      }
    } catch (error) {
      console.error("Error starting the ride: ", error);
      Alert.alert("Error", "Failed to start the ride.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-center justify-between p-6 bg-[#175E5E] h-20">
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full p-2">
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <View style={{ width: 30 }} /> {/* Empty View for alignment */}
      </View>

      {/* Bike Info and Start Trip Section */}
      <View className="absolute bottom-0 w-full p-6 bg-white shadow-lg">
        <Text className="text-2xl font-bold text-center">Start Trip</Text>

        {/* Bike Details */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="ml-4">
            <Text className="text-xl font-semibold">Bike Hoop</Text>
            <Text className="text-gray-600 mt-1">3.2 km</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={20} color="#34D399" />
              <Text className="text-green-500 ml-1">Available</Text>
            </View>
          </View>
        </View>

        {/* Start Biking Button */}
        <TouchableOpacity
          onPress={handleStartRide}
          className="bg-[#202A43] py-4 rounded-full mt-6"
          disabled={isLoading}
        >
          <Text className="text-center text-white text-lg font-bold">
            {isLoading ? "Starting Ride..." : "Start Biking"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartTripScreen;
