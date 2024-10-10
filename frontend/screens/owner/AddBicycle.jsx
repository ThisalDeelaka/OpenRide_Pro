import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../../services/api";

const AddBicycle = ({ navigation }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [combinationLock, setCombinationLock] = useState("");

  const handleAddBicycle = async () => {
    try {
      const currentLocation = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Create the object with lat and lng

      const formData = {
        currentLocation,
        rentalPrice,
        combinationLock,
      };

      const response = await api.post("/bikes/register", formData);

      if (response.status === 201) {
        Alert.alert("Success", "Bicycle added successfully!");
        navigation.navigate("OwnerNav"); // Navigate back to owner's home page
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to add the bicycle. Please check the input values."
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#F3F4F6] p-6">
      {/* Latitude Input */}
      <TextInput
        placeholder="Latitude"
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric"
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
      />

      {/* Longitude Input */}
      <TextInput
        placeholder="Longitude"
        value={lng}
        onChangeText={setLng}
        keyboardType="numeric"
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
      />

      {/* Rental Price Input */}
      <TextInput
        placeholder="Rental Price"
        value={rentalPrice}
        onChangeText={setRentalPrice}
        keyboardType="numeric"
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
      />

      {/* Combination Lock Input */}
      <TextInput
        placeholder="Combination Lock"
        value={combinationLock}
        onChangeText={setCombinationLock}
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleAddBicycle}
        className="bg-[#175E5E] rounded-full p-4 w-full max-w-md mb-4 shadow-md"
        activeOpacity={0.8}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Add Bicycle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBicycle;
