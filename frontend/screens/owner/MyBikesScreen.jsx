import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api"; // Assuming you have an api service setup

const MyBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBikeId, setEditingBikeId] = useState(null); // For tracking the bike being edited
  const [newRentalPrice, setNewRentalPrice] = useState("");
  const [newCombinationLock, setNewCombinationLock] = useState("");

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

  // Function to delete a bike
  const deleteBike = async (bikeId) => {
    try {
      await api.delete(`/bikes/${bikeId}`);
      Alert.alert("Success", "Bike deleted successfully");
      fetchBikes(); // Refresh the bike list after deletion
    } catch (error) {
      Alert.alert("Error", "Failed to delete the bike.");
    }
  };

  // Function to save the edited bike details
  const saveBikeDetails = async (bikeId) => {
    try {
      const updatedData = {
        rentalPrice: newRentalPrice,
        combinationLock: newCombinationLock,
      };
      await api.put(`/bikes/${bikeId}`, updatedData);
      Alert.alert("Success", "Bike details updated successfully");
      setEditingBikeId(null); // Reset editing state
      fetchBikes(); // Refresh the bike list after update
    } catch (error) {
      Alert.alert("Error", "Failed to update bike details.");
    }
  };

  // Render a single bike
  const renderBike = ({ item }) => {
    const isEditing = editingBikeId === item._id;

    return (
      <View className="p-4 bg-white mb-4 shadow-md rounded-lg">
        {isEditing ? (
          <>
            <TextInput
              value={newRentalPrice}
              onChangeText={setNewRentalPrice}
              placeholder="Enter new rental price"
              keyboardType="numeric"
              className="bg-gray-200 p-2 mb-2"
            />
            <TextInput
              value={newCombinationLock}
              onChangeText={setNewCombinationLock}
              placeholder="Enter new combination lock"
              className="bg-gray-200 p-2 mb-2"
            />
            <TouchableOpacity
              onPress={() => saveBikeDetails(item._id)}
              className="bg-green-500 p-2 rounded-lg"
            >
              <Text className="text-center text-white">Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditingBikeId(null)}
              className="bg-gray-400 p-2 mt-2 rounded-lg"
            >
              <Text className="text-center text-white">Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-xl font-semibold">
              Location: {item.currentLocation ? `${item.currentLocation.lat}, ${item.currentLocation.lng}` : 'Location not available'}
            </Text>
            <Text className="text-lg">Price: ${item.rentalPrice}/hour</Text>
            <Text className="text-base">Status: {item.status}</Text>
            <Text className="text-base">Combination Lock: {item.combinationLock}</Text>
            
            <TouchableOpacity
              onPress={() => {
                setEditingBikeId(item._id);
                setNewRentalPrice(item.rentalPrice.toString());
                setNewCombinationLock(item.combinationLock);
              }}
              className="bg-blue-500 p-2 mt-2 rounded-lg"
            >
              <Text className="text-center text-white">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteBike(item._id)}
              className="bg-red-500 p-2 mt-2 rounded-lg"
            >
              <Text className="text-center text-white">Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

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
            <Text className="text-center text-lg">You have no bikes added.</Text>
          )}
        />
      )}
    </View>
  );
};

export default MyBikesScreen;
