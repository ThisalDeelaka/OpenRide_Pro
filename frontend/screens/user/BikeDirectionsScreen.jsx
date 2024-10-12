import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import axios from 'axios'; // For making API calls
import { Ionicons } from "@expo/vector-icons";

const BikeDirectionsScreen = ({ route, navigation }) => {
  const { bikeLocation } = route.params; // Get bike location from previous screen
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyB0zc090Yi-GBjwOs7kG6iqVPR7XJPoDvo'; // Replace with your Google Maps API Key

  // Fetch user's current location and directions
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

      console.log('User Location:', userLocation);
      console.log('Bike Location:', bikeLocation);

      // Ensure bikeLocation has valid coordinates
      if (!bikeLocation || !bikeLocation.lat || !bikeLocation.lng) {
        Alert.alert('Invalid Bike Location', 'Bike location coordinates are missing.');
        return;
      }

      setCurrentLocation(userLocation);

      // Fetch directions from Google Directions API
      fetchDirections(userLocation, {
        latitude: bikeLocation.lat,
        longitude: bikeLocation.lng,
      });
    })();
  }, []);

  // Function to fetch directions from Google API
  const fetchDirections = async (origin, destination) => {
    const originCoords = `${origin.latitude},${origin.longitude}`;
    const destinationCoords = `${destination.latitude},${destination.longitude}`;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords}&destination=${destinationCoords}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      } else {
        console.error('No routes found:', response.data);
        Alert.alert('No Route', 'Unable to find a route between the locations.');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert('Error', 'Failed to fetch directions. Please try again later.');
      setLoading(false);
    }
  };

  // Decode polyline to get list of coordinates
  const decodePolyline = (t) => {
    let points = [];
    let index = 0, len = t.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

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
          latitude: currentLocation.latitude || 0, // Provide fallback value
          longitude: currentLocation.longitude || 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* User Marker */}
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" />
        )}

        {/* Bike Marker */}
        {bikeLocation && bikeLocation.lat && bikeLocation.lng && (
          <Marker
            coordinate={{
              latitude: bikeLocation.lat,
              longitude: bikeLocation.lng,
            }}
            title="Bike Location"
          />
        )}

        {/* Polyline for Directions */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#175E5E" // Route color
            strokeWidth={4}
          />
        )}
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
