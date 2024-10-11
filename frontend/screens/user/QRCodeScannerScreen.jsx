import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";

const QRCodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Assuming the QR code contains the bike's unlock code
    Alert.alert("QR Code Scanned", `Unlock Code: ${data}`, [
      {
        text: "OK",
        onPress: () => {
          setScanned(false);
          navigation.goBack(); // Or navigate to a different screen if needed
        },
      },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1">
      {/* Sticky Header */}
      <View className="flex-row items-center justify-between p-6 bg-[#175E5E] h-20">
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full p-2">
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* "Your Bike" Section */}
        <TouchableOpacity className="bg-[#DAEBF0] p-2 rounded-full flex-row items-center">
          <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
          <Text className="text-[#175E5E] ml-2">Your Bike</Text>
        </TouchableOpacity>

        {/* Navigate Button */}
        <TouchableOpacity className="bg-[#175E5E] p-2 rounded-full">
          <Ionicons name="navigate-outline" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* QR Code Scanner with Full Screen Below Header */}
      <View className="flex-1 justify-center items-center relative">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1, width: "100%" }}  // Full width, camera takes the rest of the screen
        />

        {/* Scanner Frame */}
        <View className="absolute border-4 border-white rounded-lg"
          style={{ height: 250, width: 250 }}
        />
      </View>

      {/* Footer Section with More Height */}
      <View className="w-full p-6 bg-[#202A43]">
        <Text className="text-center text-white text-lg">
          Scan the QR Code on bike
        </Text>
      </View>
    </View>
  );
};

export default QRCodeScannerScreen;
