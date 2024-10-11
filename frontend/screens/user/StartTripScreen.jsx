import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import * as Location from "expo-location"; // Import Location from expo
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import MapView, { Marker } from "react-native-maps"; // Import MapView and Marker from react-native-maps
import BikeImage from "../../assets/bike.png"; // Import the bike image from assets

const StartTripScreen = ({ route, navigation }) => {
  const { bikeId } = route.params; // Get bike info passed from the previous screen
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId
  const [currentLocation, setCurrentLocation] = useState(null); // State to store current location

  // Retrieve userId from AsyncStorage and get user's location
  useEffect(() => {
    const getUserIdAndLocation = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          setUserId(parsedUserData.id); // Set userId from AsyncStorage
        }

        // Get the user's current location (as start location)
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Allow location access to start the ride.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
      } catch (error) {
        console.error("Error fetching userId or location:", error);
      }
    };

    getUserIdAndLocation(); // Call the function on component mount
  }, []);

  const handleStartRide = async () => {
    try {
      setIsLoading(true);

      if (!currentLocation) {
        Alert.alert("Error", "Could not retrieve your location.");
        setIsLoading(false);
        return;
      }

      const startLocation = {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
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

        // Navigate to RideTrackingScreen
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* "Your Bike" Section */}
        <TouchableOpacity style={{ backgroundColor: '#DAEBF0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
          <Text style={{ color: '#175E5E', marginLeft: 8 }}>Your Bike</Text>
        </TouchableOpacity>

        {/* Empty View for alignment */}
        <View style={{ width: 30 }} />
      </View>

      {/* Map Section */}
      <View style={{ flex: 1 }}>
        {currentLocation ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={currentLocation}
          >
            {/* Marker for current location */}
            <Marker coordinate={currentLocation} title="Your Location" />
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#175E5E" style={{ flex: 1 }} />
        )}
      </View>

      {/* Bike Info and Start Trip Section */}
      <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Start Trip</Text>

        {/* Bike Details */}
        <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
          {/* Bike Image */}
          <Image source={BikeImage} style={{ width: 100, height: 100 }} resizeMode="contain" />

          <View style={{ marginLeft: 30 }}>
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
