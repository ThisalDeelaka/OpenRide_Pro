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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* Empty View for alignment */}
        <View style={{ width: 30 }} />
      </View>

      {/* Bike Info and Start Trip Section */}
      <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Start Trip</Text>

        {/* Bike Details */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Bike Hoop</Text>
            <Text style={{ color: '#666', marginTop: 8 }}>3.2 km</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="location-outline" size={20} color="#34D399" />
              <Text style={{ color: '#34D399', marginLeft: 8 }}>Available</Text>
            </View>
          </View>
        </View>

        {/* Start Biking Button */}
        <TouchableOpacity
          onPress={handleStartRide}
          style={{ backgroundColor: '#202A43', paddingVertical: 16, borderRadius: 50, marginTop: 16 }}
          disabled={isLoading}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            {isLoading ? "Starting Ride..." : "Start Biking"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartTripScreen;
