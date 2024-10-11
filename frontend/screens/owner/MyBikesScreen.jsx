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
  Image, // Import Image here
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import bikeImg from "../../assets/bike.png"; // Assuming you have this image in the assets folder

const MyBikesScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBikeId, setEditingBikeId] = useState(null);
  const [newRentalPrice, setNewRentalPrice] = useState("");
  const [newCombinationLock, setNewCombinationLock] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);

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
    fetchBikes();
  }, []);

  const deleteBike = async (bikeId) => {
    try {
      await api.delete(`/bikes/${bikeId}`);
      Alert.alert("Success", "Bike deleted successfully");
      fetchBikes();
    } catch (error) {
      Alert.alert("Error", "Failed to delete the bike.");
    }
  };

  const saveBikeDetails = async () => {
    try {
      const updatedData = {
        rentalPrice: newRentalPrice,
        combinationLock: newCombinationLock,
      };
      await api.put(`/bikes/${editingBikeId}`, updatedData);
      Alert.alert("Success", "Bike details updated successfully");
      setEditModalVisible(false);
      fetchBikes();
    } catch (error) {
      Alert.alert("Error", "Failed to update bike details.");
    }
  };

  const openEditModal = (item) => {
    setEditingBikeId(item._id);
    setNewRentalPrice(item.rentalPrice.toString());
    setNewCombinationLock(item.combinationLock);
    setEditModalVisible(true);
  };

  const renderRightActions = (bikeId) => (
    <TouchableOpacity
      onPress={() => deleteBike(bikeId)}
      className="bg-red-500 justify-center p-4 rounded-lg"
    >
      <Text className="text-white font-bold">Delete</Text>
    </TouchableOpacity>
  );

  const renderBike = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item._id)}>
        <TouchableOpacity
          onLongPress={() => openEditModal(item)}
          className="p-4 bg-white mb-4 shadow-lg rounded-lg flex-row items-center"
        >
          <Image source={bikeImg} className="w-16 h-16 rounded-lg mr-4" />
          <View className="flex-1">
            {/* Updated bikeName field */}
            <Text className="text-xl font-semibold text-[#175E5E]">
              {item.bikeName || `Bike ${item._id}`}
            </Text>
            <Text className="text-gray-600">
              Price: ${item.rentalPrice}/hour
            </Text>
            <Text className="text-gray-600">Lock: {item.combinationLock}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      <View className="flex-row items-center bg-[#175E5E] p-4 shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">My Bikes</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#175E5E" className="mt-8" />
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item._id}
          renderItem={renderBike}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          ListEmptyComponent={() => (
            <Text className="text-center text-lg">
              You have no bikes added.
            </Text>
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            className="flex-1 justify-end"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            {/* Keyboard Avoiding View */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              {/* Modal content */}
              <View
                className="bg-white rounded-t-2xl shadow-lg p-6"
                style={{
                  maxHeight: "60%", // Adjust modal height
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

                <Text className="text-2xl font-bold mb-4">
                  Edit Bike Details
                </Text>

                {/* Rental Price Input */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-800 mb-2">
                    Rental Price ($)
                  </Text>
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
                  <Text className="text-lg font-semibold text-gray-800 mb-2">
                    Combination Lock Code
                  </Text>
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
                  className="bg-[#175E5E] py-4 rounded-lg"
                  style={{ backgroundColor: "#175E5E" }}
                >
                  <Text className="text-center text-white font-bold">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MyBikesScreen;
