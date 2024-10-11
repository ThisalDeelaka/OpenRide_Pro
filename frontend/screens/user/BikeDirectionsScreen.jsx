import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";

const BikeDirectionsScreen = ({ route, navigation }) => {
  const { bikeLocation } = route.params; // Get bike location from previous screen
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to show directions.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(userLocation);

      // Generate a simple straight-line polyline between user and bike
      const coordinates = [
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: bikeLocation.latitude, longitude: bikeLocation.longitude },
      ];

      setRouteCoordinates(coordinates);
      setLoading(false);
    })();
  }, []);

  if (loading || !currentLocation) {
    return <ActivityIndicator size="large" color="#175E5E" />;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-center justify-between p-6 bg-[#175E5E] h-20">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <View className="flex-1 mx-4">
          <Text className="text-lg font-bold text-white">Your Bike</Text>
          <Text className="text-sm text-gray-200">Spot 21</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="navigate-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* User Marker */}
        <Marker coordinate={currentLocation} title="Your Location" />

        {/* Bike Marker */}
        <Marker coordinate={bikeLocation} title="Bike Location" />

        {/* Straight Line Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#175E5E" // Route color
          strokeWidth={4}
        />
      </MapView>

      {/* Unlock Button */}
      <View className="absolute bottom-0 w-full p-4 bg-[#DAEBF0]">
        <TouchableOpacity
          onPress={() => navigation.navigate("QRCodeScannerScreen")} // Navigate to the QR code scanner
          className="bg-[#175E5E] py-4 rounded-full shadow-lg flex-row justify-center items-center"
        >
          <Ionicons name="qr-code-outline" size={20} color="#FFF" className="mr-2" />
          <Text className="text-white text-lg font-bold">Unlock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BikeDirectionsScreen;
