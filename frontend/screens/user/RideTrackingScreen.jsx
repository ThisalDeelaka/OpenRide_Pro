import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import api from "../../services/api";

const RideTrackingScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await api.get(`/rides/${rideId}`);
        const rideData = response.data;
        // Assuming the backend sends distance and average speed
        setDistance(rideData.distance);
        setAverageSpeed(rideData.averageSpeed);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };

    fetchRideDetails();

    const watchPosition = async () => {
      await Location.requestForegroundPermissionsAsync();
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (location) => {
          const { speed } = location.coords;
          const speedKmh = speed * 3.6; // Convert m/s to km/h
          setCurrentSpeed(speedKmh.toFixed(1));
        }
      );
    };

    watchPosition();

    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);

    return () => clearInterval(interval); // Clean up timer
  }, [rideId]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleEndTrip = () => {
    
    navigation.navigate("EndTripScreen", {
      rideId,
      totalSpend: calculateTotalSpend(),
      distance,
      time: formatTime(timer),
    });
  };

  // Assuming this function calculates the total spend based on some logic
  const calculateTotalSpend = () => {
    const pricePerKm = 60; // Example fare calculation
    return (pricePerKm * distance).toFixed(2); // Total fare for the distance
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center  p-6 bg-[#175E5E] shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Ride Tracking</Text>
      </View>

      {/* Speed Display */}
      <View className="flex items-center mt-12">
        <View className="w-60 h-60 justify-center items-center border-8 border-[#34D399] rounded-full shadow-lg">
          <Text className="text-7xl font-extrabold text-[#175E5E]">{currentSpeed}</Text>
          <Text className="text-2xl text-[#175E5E] mt-4">km/h</Text>
        </View>
      </View>

      {/* Timer Display */}
      <View className="flex items-center mt-8">
        <Text className="bg-[#E0F7F7] text-[#175E5E] text-2xl px-8 py-4 rounded-full shadow-md">
          {formatTime(timer)}
        </Text>
      </View>

      {/* Distance and Average Speed */}
      <View className="flex-row justify-around mt-8">
        <View className="bg-[#E8F8A1] p-4 rounded-lg shadow-md w-40">
          <Text className="text-[#175E5E] text-lg">Distance</Text>
          <Text className="text-[#175E5E] text-2xl font-bold mt-2">{distance} km</Text>
        </View>
        <View className="bg-[#D7D5F8] p-4 rounded-lg shadow-md w-40">
          <Text className="text-[#175E5E] text-lg">Avg Speed</Text>
          <Text className="text-[#175E5E] text-2xl font-bold mt-2">{averageSpeed} km/h</Text>
        </View>
      </View>

      {/* End Trip Button */}
      <TouchableOpacity
        onPress={handleEndTrip}
        className={`bg-[#175E5E] p-4 rounded-full mt-10 mx-6 flex-row justify-center items-center ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="chevron-forward-outline" size={24} color="#FFF" />
            <Text className="text-white text-lg font-bold ml-2">End Trip</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RideTrackingScreen;
