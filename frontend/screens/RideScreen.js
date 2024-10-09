import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import api from "../services/api";

const RideScreen = ({ navigation }) => {
  const [ride, setRide] = useState(null);

  const handleStartRide = async () => {
    try {
      const response = await api.post("/rides/start", {
        bikeId: "some-bike-id", // Replace with actual bike ID
        startLocation: { lat: 37.78825, lng: -122.4324 }, // Replace with actual location
      });
      setRide(response.data);
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  const handleEndRide = async () => {
    try {
      await api.post("/rides/end", {
        rideId: ride.rideId,
        endLocation: { lat: 37.78825, lng: -122.4324 }, // Replace with actual location
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Ride in Progress</Text>
      {!ride ? (
        <Button title="Start Ride" onPress={handleStartRide} />
      ) : (
        <Button title="End Ride" onPress={handleEndRide} />
      )}
    </View>
  );
};

export default RideScreen;
