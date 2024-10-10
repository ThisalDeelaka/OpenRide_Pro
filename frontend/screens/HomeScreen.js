import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import api from "../services/api";
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchBikes = async () => {
      const response = await api.get("/bikes");
      setBikes(response.data);
    };

    fetchBikes();
  }, []);

  const fetchUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Update the map region to the user's current location
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        region={mapRegion}
        onRegionChangeComplete={region => setMapRegion(region)}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {bikes.map((bike) => (
          <Marker
            key={bike._id}
            coordinate={{
              latitude: bike.currentLocation.lat,
              longitude: bike.currentLocation.lng,
            }}
            title={`Bike ${bike._id}`}
          />
        ))}
      </MapView>
      <Button title="Go to My Location" onPress={fetchUserLocation} />
      <Button title="Start Ride" onPress={() => navigation.navigate("Ride")} />
    </View>
  );
};

export default HomeScreen;
