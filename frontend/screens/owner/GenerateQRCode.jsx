import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg"; // QR code generation library
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure this is imported
import * as FileSystem from "expo-file-system"; // For saving the QR code
import * as Sharing from "expo-sharing"; // For sharing the QR code
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

const GenerateQRCode = ({ route, navigation }) => {
  const { bikeName, rentalPrice, currentLocation, combinationLock } = route.params;
  const [bikeId, setBikeId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const qrCodeRef = useRef(); // Ref for the QR code

  useEffect(() => {
    const registerBike = async () => {
      try {
        const ownerId = await AsyncStorage.getItem("user").then(
          (user) => JSON.parse(user).id
        ); // Get ownerId from AsyncStorage

        const response = await api.post("/bikes/register", {
          ownerId,
          bikeName,
          currentLocation,
          rentalPrice: parseFloat(rentalPrice),
          combinationLock,
        });

        if (response.status === 201) {
          setBikeId(response.data.bike._id); // Get unique bike ID from the response
        } else {
          Alert.alert("Error", "Failed to register bike.");
        }
      } catch (error) {
        console.error("Error registering bike:", error.message);
        Alert.alert("Error", "Failed to register bike.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    registerBike();
  }, []);

  const downloadQRCode = async () => {
    try {
      const uri = await qrCodeRef.current.toDataURL();
      const filePath = FileSystem.documentDirectory + "qr_code.png";
      await FileSystem.writeAsStringAsync(filePath, uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(filePath);
    } catch (error) {
      Alert.alert("Error", "Failed to download the QR code.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#175E5E" />
        <Text className="text-[#175E5E] mt-4 text-lg">Generating QR Code...</Text>
      </View>
    );
  }

  if (!bikeId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Error generating bike ID</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-[#F3F4F6]">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-[#175E5E] h-20 px-6 w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Bike Registered</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* QR Code Section */}
      <View className="items-center mt-10 mb-6 relative">
        <QRCode value={bikeId} size={200} getRef={qrCodeRef} />
        {/* Download Button (Icon) */}
        <TouchableOpacity
          onPress={downloadQRCode}
          className="absolute right-0 top-5 bg-[#175E5E] p-3 rounded-full"
        >
          <Ionicons name="download-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-gray-500 mt-4 text-lg">Bike ID: {bikeId}</Text>
      </View>

      {/* Bike Information Section */}
      <View className="bg-white p-5 rounded-lg shadow-md mb-6">
        <Text className="text-[#175E5E] text-lg font-bold">{bikeName}</Text>
        <Text className="text-gray-600 mt-2">Price: ${rentalPrice}/hour</Text>
        <Text className="text-gray-600 mt-2">
          Location: {currentLocation.lat}, {currentLocation.lng}
        </Text>
        <Text className="text-gray-600 mt-2">Lock Code: {combinationLock}</Text>
      </View>

      {/* Finish Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("OwnerNav")}
        className="bg-[#175E5E] py-4 rounded-full items-center"
      >
        <Text className="text-white text-lg font-bold">Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenerateQRCode;
