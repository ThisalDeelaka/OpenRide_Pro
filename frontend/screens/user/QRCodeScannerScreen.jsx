import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
const QRCodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    
    try {
      // Fetch bike details from the backend
      const response = await api.get(`/bikes/${data}`);
      const bike = response.data; // This should be the bike object with combination lock
      console.log("Bike details:", bike);
      if (bike.combinationLock) {
        // Navigate to another screen with the combination lock
        navigation.navigate("UnlockCodeScreen", { unlockCode: bike.combinationLock,bikeId: bike._id });
      } else {
        Alert.alert("Error", "Bike details not found.");
      }
    } catch (error) {
      console.error("Error fetching bike details:", error);
      Alert.alert("Error", "Could not retrieve bike information.");
    } finally {
      setScanned(false); // Reset scanner for the next scan
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* "Your Bike" Section */}
        <TouchableOpacity style={{ backgroundColor: '#DAEBF0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
          <Text style={{ color: '#175E5E', marginLeft: 8 }}>Your Bike</Text>
        </TouchableOpacity>

        {/* Navigate Button */}
        <TouchableOpacity style={{ backgroundColor: '#175E5E', padding: 10, borderRadius: 20 }}>
          <Ionicons name="navigate-outline" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* QR Code Scanner with Full Screen Below Header */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1, width: "100%" }}  
        />

        {/* Scanner Frame */}
        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 10, position: 'absolute', height: 250, width: 250 }} />
      </View>

      {/* Footer Section with More Height */}
      <View style={{ width: '100%', padding: 24, backgroundColor: '#202A43' }}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
          Scan the QR Code on bike
        </Text>
      </View>
    </View>
  );
};

export default QRCodeScannerScreen;
