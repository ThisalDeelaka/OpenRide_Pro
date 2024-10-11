import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, Modal } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';  // Gesture handler for swipeable
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api"; // Assuming you have an api service setup

const MyBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBike, setEditingBike] = useState(null);  // For tracking the bike being edited
  const [newRentalPrice, setNewRentalPrice] = useState("");
  const [newCombinationLock, setNewCombinationLock] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);  // For managing the edit modal visibility

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

  // Function to confirm deletion
  const confirmDelete = (bikeId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this bike?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteBike(bikeId), style: "destructive" }
      ]
    );
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
      setEditModalVisible(false);  // Close modal
      fetchBikes();  // Refresh the list after editing
    } catch (error) {
      Alert.alert("Error", "Failed to update bike details.");
    }
  };

  // Triggered when the user long presses a bike item
  const handleLongPress = (item) => {
    setEditingBike(item);  // Set the current bike being edited
    setNewRentalPrice(item.rentalPrice.toString());
    setNewCombinationLock(item.combinationLock);
    setEditModalVisible(true);  // Show the edit modal
  };

  // Swipeable action for deleting
  const rightSwipeActions = (item) => {
    return (
      <View className="bg-red-500 justify-center items-center w-24 rounded-r-lg">
        <TouchableOpacity onPress={() => confirmDelete(item._id)}>
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Modal for editing
  const EditModal = () => (
    <Modal
      visible={isEditModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setEditModalVisible(false)}  // Close modal on back press
    >
      <View className="flex-1 justify-center bg-gray-300">
        <View className="bg-white w-[90%] p-6 rounded-lg mx-auto">
          {/* Title */}
          <Text className="text-xl font-bold mb-4">Edit Bike Details</Text>
  
          {/* Rental Price Input */}
          <TextInput
            value={newRentalPrice}
            onChangeText={setNewRentalPrice}
            placeholder="Enter new rental price"
            keyboardType="numeric"
            className="bg-gray-200 p-2 mb-4 rounded-lg"
          />
  
          {/* Combination Lock Input */}
          <TextInput
            value={newCombinationLock}
            onChangeText={setNewCombinationLock}
            placeholder="Enter new combination lock"
            className="bg-gray-200 p-2 mb-4 rounded-lg"
          />
  
          {/* Save Button */}
          <TouchableOpacity
            onPress={() => saveBikeDetails(editingBike._id)}
            className="bg-[#175E5E] p-4 rounded-full"
          >
            <Text className="text-white text-center font-bold">Save Changes</Text>
          </TouchableOpacity>
  
          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => setEditModalVisible(false)}
            className="bg-gray-400 p-4 rounded-full mt-4"
          >
            <Text className="text-white text-center font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  // Render a single bike
  const renderBike = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => rightSwipeActions(item)}>
        <TouchableOpacity
          onLongPress={() => handleLongPress(item)}
          className="p-4 bg-white mb-4 shadow-md rounded-lg"
        >
          <Text className="text-xl font-semibold text-[#175E5E]">{item.name || `Bike ${item._id}`}</Text>
          <Text className="text-lg">Price: ${item.rentalPrice}/hour</Text>
          <Text className="text-gray-600">Status: {item.isAvailable ? "Available" : "Unavailable"}</Text>
          <Text className="text-gray-600">Combination Lock: {item.combinationLock}</Text>
        </TouchableOpacity>
      </Swipeable>
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

      {/* Edit Modal */}
      <EditModal />
    </View>
  );
};

export default MyBikesScreen;
