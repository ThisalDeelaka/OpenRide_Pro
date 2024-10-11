import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import BikeImage from "../../assets/bike.png"; 

const StartTripScreen = ({ route, navigation }) => {
  const { bikeId, bikeLocation } = route.params; // Get bike info passed from the previous screen
  const [isLoading, setIsLoading] = useState(false);

  const handleStartRide = async () => {
    try {
      setIsLoading(true);

      // Get the user's current location (as start location)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location access to start the ride.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const startLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      // Send the start ride request to the backend
      const response = await axios.post("backend-url", {
        bikeId,
        startLocation,
      });

      if (response.status === 201) {
        const { rideId } = response.data;
        Alert.alert("Ride Started", "You have successfully started the ride.");

        // Navigate to another screen (e.g., a ride tracking screen) if needed
        navigation.navigate("RideTrackingScreen", { rideId, bikeLocation });
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

        {/* "Your Bike" Section */}
        <TouchableOpacity className="bg-[#DAEBF0] px-4 py-2 rounded-full flex-row items-center">
          <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
          <Text className="text-[#175E5E] ml-2">Your Bike</Text>
        </TouchableOpacity>

        <View style={{ width: 30 }} /> {/* Empty View for alignment */}
      </View>

      {/* Map Section (Optional if you're showing a map) */}
      <View className="flex-1">
        {/* Placeholder for map or bike details */}
        <Image source={require('../../assets/map.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>

      {/* Bike Info and Start Trip Section */}
      <View className="absolute bottom-0 w-full p-6 bg-white shadow-lg">
        <Text className="text-2xl font-bold text-center">Start Trip</Text>

        {/* Bike Details */}
        <View className="flex-row items-center justify-between mt-4">
          <Image source={BikeImage} className="w-24 h-24 rounded-lg" />
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
