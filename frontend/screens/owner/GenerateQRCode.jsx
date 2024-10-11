import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg"; // QR code generation library
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure this is imported
import api from "../../services/api";

const GenerateQRCode = ({ route, navigation }) => {
  const { bikeName, rentalPrice, currentLocation, images, combinationLock } =
    route.params;
  const [bikeId, setBikeId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Save the bike to the database and generate a unique bike ID
    const registerBike = async () => {
      try {
        // Get ownerId from AsyncStorage
        const ownerId = await AsyncStorage.getItem("user").then(
          (user) => JSON.parse(user).id
        );

        console.log("Registering bike with data: ", {
          ownerId,
          bikeName,
          rentalPrice,
          currentLocation,
          images,
          combinationLock,
        });

        const response = await api.post("/bikes/register", {
          ownerId,
          currentLocation, // Pass location with lat, lng
          rentalPrice: parseFloat(rentalPrice), // Ensure rental price is a number
          combinationLock, // Pass combination lock
        });

        if (response.status === 201) {
          setBikeId(response.data.bike._id); // Get unique bike ID from the response
        } else {
          Alert.alert("Error", "Failed to register bike.");
        }
      } catch (error) {
        console.error(
          "Error registering bike:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "Failed to register bike.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    registerBike();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#175E5E" />
        <Text>Generating QR Code...</Text>
      </View>
    );
  }

  if (!bikeId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error generating bike ID</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-[#F3F4F6]">
      <Text className="text-2xl font-bold mb-4">Bike Registered</Text>
      <Text className="text-lg mb-6">Scan this QR code to rent the bike.</Text>

      {/* QR Code */}
      <QRCode value={bikeId} size={200} />

      {/* Bike ID */}
      <Text className="text-center text-gray-500 mt-4">Bike ID: {bikeId}</Text>

      {/* Finish Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("OwnerNav")}
        className="bg-[#175E5E] p-4 rounded-full mt-6"
      >
        <Text className="text-white text-center font-bold">Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenerateQRCode;
