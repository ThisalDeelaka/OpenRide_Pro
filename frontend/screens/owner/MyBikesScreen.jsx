import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api"; // Assuming you have an api service setup

const MyBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch bikes from backend
  const fetchBikes = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const response = await api.get(`/bikes/owner/${user.id}`);
        setBikes(response.data);
      }
    } catch (error) {
      console.error("Error fetching bikes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes(); // Fetch bikes when the component mounts
  }, []);

  // Render a single bike
  const renderBike = ({ item }) => (
    <View className="p-4 bg-white mb-4 shadow-md rounded-lg">
      <Text className="text-xl font-semibold">
        Location: {item.currentLocation.lat}, {item.currentLocation.lng}
      </Text>
      <Text className="text-lg">Price: ${item.rentalPrice}/hour</Text>
      <Text className="text-base">Status: {item.status}</Text>
      <Text className="text-base">
        Combination Lock: {item.combinationLock}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-[#F3F4F6]">
      <Text className="text-2xl font-bold text-center mb-4">My Bikes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#175E5E" />
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item._id}
          renderItem={renderBike}
          ListEmptyComponent={() => (
            <Text className="text-center text-lg">
              You have no bikes added.
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default MyBikesScreen;
