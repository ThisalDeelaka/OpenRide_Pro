import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import BikeImage from "../../assets/bike.png"; // Assuming you have the bike image here
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensure it handles device notches

const EndTripScreen = ({ route, navigation }) => {
  const { rideId, timeee } = route.params;
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
        setTime(formatTime(timeee));
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
        navigation.navigate("PaymentScreen"); // Navigate to the home screen after ending the trip
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* "Your Bike" Section */}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#DAEBF0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
            <Text style={{ color: '#175E5E', marginLeft: 8 }}>Your Bike</Text>
          </TouchableOpacity>
        </View>

        {/* Empty View for alignment */}
        <View style={{ width: 30 }} />
      </View>

      {/* Bike Image */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image source={BikeImage} style={{ width: 300, height: 290 }} resizeMode="contain" />
      </View>

      {/* Total Spend, Distance, and Time */}
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, marginHorizontal: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
  <View style={{ backgroundColor: '#E8F8A1', borderRadius: 10, padding: 15, marginBottom: 15 }}>
    <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>LKR {totalSpend.toFixed(2)}</Text>
    <Text style={{ textAlign: 'center', fontSize: 16, color: '#6B7280' }}>Total Spend</Text>
  </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#F8E8E8', borderRadius: 10, padding: 15, width: '48%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>{distance} km</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, color: '#6B7280' }}>Distance</Text>
          </View>
          <View style={{ backgroundColor: '#F8E8E8', borderRadius: 10, padding: 15, width: '48%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>{timeee}</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, color: '#6B7280' }}>Time</Text>
          </View>
        </View>
      </View>

      {/* End Trip Button */}
      <TouchableOpacity
        onPress={handleEndTrip}
        style={{ backgroundColor: '#175E5E', paddingVertical: 15, borderRadius: 30, marginHorizontal: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: isLoading ? 0.5 : 1 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="chevron-forward-outline" size={24} color="#FFF" />
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>End Trip</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EndTripScreen;
