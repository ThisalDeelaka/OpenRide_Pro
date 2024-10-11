import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import BikeImage from "../../assets/bike.png"; // Assuming you have the bike image here
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensure it handles device notches

const EndTripScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [totalSpend, setTotalSpend] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const response = await api.get(`/rides/${rideId}`);
        const rideData = response.data;
        setTotalSpend(rideData.totalFare);
        setDistance(rideData.distance); 
        setTime(formatTime(rideData.duration)); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ride data:", error);
        Alert.alert("Error", "Failed to load ride data.");
      }
    };

    fetchRideData();
  }, [rideId]);

  // Helper function to format time from seconds
  const formatTime = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEndTrip = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("/rides/end", { rideId });
      if (response.status === 200) {
        Alert.alert("Trip Ended", "Your trip has ended successfully.");
        navigation.navigate("HomeScreen"); // Navigate to the home screen after ending the trip
      } else {
        Alert.alert("Error", "Failed to end the trip.");
      }
    } catch (error) {
      console.error("Error ending trip:", error);
      Alert.alert("Error", "Failed to end the trip.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header Section */}
      <View style={{ position: 'absolute', top: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
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

      {/* Bike Image */}
      <View className="flex items-center mb-6 mt-4">
        <Image source={BikeImage} style={{ width: 300, height: 290 }} resizeMode="contain" />
      </View>

      {/* Total Spend, Distance, and Time */}
      <View className="bg-white rounded-lg p-4 shadow-lg mb-6">
        <View className="bg-[#E8F8A1] p-4 rounded-lg mb-4">
          <Text className="text-center text-2xl font-bold">{totalSpend} LKR</Text>
          <Text className="text-center text-lg text-gray-600">Total spend</Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <View className="bg-[#F8E8E8] p-4 rounded-lg w-40">
            <Text className="text-center text-2xl font-bold">{distance} km</Text>
            <Text className="text-center text-lg text-gray-600">Distance</Text>
          </View>
          <View className="bg-[#F8E8E8] p-4 rounded-lg w-40">
            <Text className="text-center text-2xl font-bold">{time}</Text>
            <Text className="text-center text-lg text-gray-600">Time</Text>
          </View>
        </View>
      </View>

      {/* End Trip Button */}
      <TouchableOpacity
        onPress={handleEndTrip}
        className={`bg-[#175E5E] p-4 rounded-full mx-6 flex-row justify-center items-center ${isLoading ? "opacity-50" : ""}`}
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
    </SafeAreaView>
  );
};

export default EndTripScreen;
