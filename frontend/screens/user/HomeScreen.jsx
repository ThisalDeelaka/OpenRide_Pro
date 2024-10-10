import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import MapView, { Marker } from 'react-native-maps';

// Drawer menu component
const DrawerMenu = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        <View className="w-64 bg-white h-full p-5">
          <TouchableOpacity onPress={onClose} className="mb-6">
            <Ionicons name="close" size={30} color="#175E5E" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#175E5E] mb-5">Menu</Text>
          {/* Menu Items */}
        </View>
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
};

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/bikes");
        if (response.data && Array.isArray(response.data)) {
          setBikes(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
        setError("Failed to load bikes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5">
      <DrawerMenu visible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />
      
      <View className="flex-row justify-between items-center mt-5">
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>
        <View>
          <Text className="text-3xl font-bold text-teal-800">Hello, Matheesha</Text>
          <Text className="text-lg text-gray-500 mt-1">Your nearest bike is waiting!</Text>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#175E5E" />
          <Text className="mt-2 text-gray-500">Loading bikes...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
          <TouchableOpacity onPress={() => fetchBikes()} className="mt-2">
            <Text className="text-blue-500">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="mt-5 shadow-md rounded-lg overflow-hidden">
          <MapView
            className="w-full h-64"
            initialRegion={{
              latitude: 6.9271,
              longitude: 79.9616,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {bikes.map((bike) => (
              <Marker
                key={bike._id}
                coordinate={{
                  latitude: bike.currentLocation.lat,
                  longitude: bike.currentLocation.lng,
                }}
                title={bike.ownerId.name || "Unnamed Bike"}
                description={bike.status || "Status unknown"}
                pinColor="#FF7A00"
              />
            ))}
          </MapView>
        </View>
      )}

      <TouchableOpacity
        className="bg-[#175E5E] p-4 rounded-lg shadow-lg mt-8 mb-8"
        onPress={() => navigation.navigate("NearBikeList", { bikes })}
      >
        <Text className="text-center text-white text-lg font-bold">Start Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
