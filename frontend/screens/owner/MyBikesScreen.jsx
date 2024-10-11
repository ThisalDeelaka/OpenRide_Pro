import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler"; // For swipeable list items
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api"; // Assuming you have an api service setup

const MyBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBikeId, setEditingBikeId] = useState(null); // For tracking the bike being edited
  const [newRentalPrice, setNewRentalPrice] = useState("");
  const [newCombinationLock, setNewCombinationLock] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false); // For modal visibility

  // Fetch bikes from backend
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

  // Delete a bike
  const deleteBike = async (bikeId) => {
    try {
      await api.delete(`/bikes/${bikeId}`);
      Alert.alert("Success", "Bike deleted successfully");
      fetchBikes(); // Refresh the bike list after deletion
    } catch (error) {
      Alert.alert("Error", "Failed to delete the bike.");
    }
  };

  // Save the edited bike details
  const saveBikeDetails = async () => {
    try {
      const updatedData = {
        rentalPrice: newRentalPrice,
        combinationLock: newCombinationLock,
      };
      await api.put(`/bikes/${editingBikeId}`, updatedData);
      Alert.alert("Success", "Bike details updated successfully");
      setEditModalVisible(false); // Close the modal
      fetchBikes(); // Refresh the bike list after update
    } catch (error) {
      Alert.alert("Error", "Failed to update bike details.");
    }
  };

  // Open the edit modal with pre-filled values
  const openEditModal = (item) => {
    setEditingBikeId(item._id);
    setNewRentalPrice(item.rentalPrice.toString());
    setNewCombinationLock(item.combinationLock);
    setEditModalVisible(true); // Show the modal
  };

  // Render the delete button when swiped left
  const renderRightActions = (bikeId) => (
    <TouchableOpacity
      onPress={() => deleteBike(bikeId)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
        backgroundColor: "#FF6B6B",
        borderRadius: 10,
        marginVertical: 5,
      }}
    >
      <Text className="text-white font-bold">Delete</Text>
    </TouchableOpacity>
  );

  // Render a single bike
  const renderBike = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item._id)}>
        <TouchableOpacity
          onLongPress={() => openEditModal(item)} // Long press to open the edit modal
          style={{
            backgroundColor: "white",
            padding: 16,
            marginBottom: 10,
            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text className="text-xl font-semibold">
            Location: {item.currentLocation ? `${item.currentLocation.lat}, ${item.currentLocation.lng}` : 'Location not available'}
          </Text>
          <Text className="text-lg">Price: ${item.rentalPrice}/hour</Text>
          <Text className="text-base">Status: {item.status}</Text>
          <Text className="text-base">Combination Lock: {item.combinationLock}</Text>
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
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        {/* Background overlay */}
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          {/* Modal content */}
          <View
            className="bg-white rounded-t-2xl shadow-lg p-6"
            style={{
              maxHeight: '60%',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            {/* Close Icon */}
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              className="absolute top-4 right-4"
            >
              <Ionicons name="close" size={30} color="gray" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold mb-4">Edit Bike Details</Text>

            {/* Rental Price Input */}
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">Rental Price ($)</Text>
              <TextInput
                value={newRentalPrice}
                onChangeText={setNewRentalPrice}
                placeholder="Enter new rental price"
                keyboardType="numeric"
                className="bg-gray-200 p-4 rounded-lg"
              />
            </View>

            {/* Combination Lock Input */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-800 mb-2">Combination Lock Code</Text>
              <TextInput
                value={newCombinationLock}
                onChangeText={setNewCombinationLock}
                placeholder="Enter new combination lock"
                className="bg-gray-200 p-4 rounded-lg"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={saveBikeDetails}
              className="bg-[#175E5E] p-4 rounded-lg"
            >
              <Text className="text-center text-white font-bold">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyBikesScreen;
