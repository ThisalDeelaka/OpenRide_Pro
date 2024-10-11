import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import bikeImg from "../../assets/bike.png"; // Assuming this image exists

const BikeDetailsScreen = ({ route }) => {
  const [bikeLocation, setBikeLocation] = useState(null); // To store the bike's or user's location
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { bike } = route.params || {}; // Safely access the bike object

    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Location access is needed to fetch the bike location.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLocation = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };

        setBikeLocation(userLocation); // Set user’s location as bike location
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch location.');
      } finally {
        setLoading(false);
      }
    };

    // If the bike exists and has a currentLocation, use it, else fetch the user’s location
    if (bike && bike.currentLocation) {
      setBikeLocation({
        lat: bike.currentLocation.lat,
        lng: bike.currentLocation.lng,
      });
      setLoading(false);
    } else {
      fetchCurrentLocation(); // Fetch user's current location if bike location is missing
    }
  }, [route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color="#175E5E" style={{ flex: 1 }} />;
  }

  if (!bikeLocation) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Unable to get location data.</Text>
      </View>
    );
  }

  const { bike } = route.params || {}; // Safely access the bike details if it exists
  const bikeName = bike?.bikeName || "Unknown Bike";
  const rentalPrice = bike?.rentalPrice || "N/A";
  const combinationLock = bike?.combinationLock || "N/A";

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-center p-6 bg-[#175E5E] shadow-md">
        <Ionicons name="bicycle-outline" size={24} color="#FFF" />
        <Text className="text-2xl font-bold text-white ml-4">{bikeName}</Text>
      </View>

      {/* Map Section */}
      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: bikeLocation.lat,
            longitude: bikeLocation.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: bikeLocation.lat,
              longitude: bikeLocation.lng,
            }}
            title={bikeName}
            description={`Rental Price: $${rentalPrice}/hour`}
          />
        </MapView>
      </View>

      {/* Bike Info */}
      <View className="p-4 bg-white shadow-md">
        <Image source={bikeImg} className="w-40 h-40 mx-auto mb-4" resizeMode="contain" />
        <Text className="text-lg text-center">Rental Price: ${rentalPrice}/hour</Text>
        <Text className="text-lg text-center">Combination Lock: {combinationLock}</Text>
      </View>
    </View>
  );
};

export default BikeDetailsScreen;
