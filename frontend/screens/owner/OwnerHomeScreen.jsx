import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import BikeImage from "../../assets/bike.png"; // Assuming the bike image is in the assets folder

const DrawerMenu = ({ visible, onClose, navigation }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar Drawer */}
        <View className="w-64 bg-white h-full p-5 shadow-lg">
          <TouchableOpacity onPress={onClose} className="mb-6">
            <Ionicons name="close" size={30} color="#175E5E" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#175E5E] mb-5">Menu</Text>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => navigation.navigate("AddBicycleDetails")}
          >
            <Ionicons name="add-circle-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Add Bicycle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => navigation.navigate("MyBikes")}
          >
            <Ionicons name="bicycle-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">My Bikes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => navigation.navigate("Wallet")}
          >
            <Ionicons name="wallet-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => navigation.navigate("Income")}
          >
            <Ionicons name="cash-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Income</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => navigation.navigate("Maintenance")}
          >
            <Ionicons name="construct-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Maintenance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("History")}
          >
            <Ionicons name="time-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">History</Text>
          </TouchableOpacity>
        </View>

        {/* Overlay to close the drawer */}
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
};

const OwnerHomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Manage drawer visibility
  const [ownerName, setOwnerName] = useState(""); // Store owner's name

  // Fetch the list of bikes owned by the owner
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setOwnerName(user.name); // Set owner's name from AsyncStorage

          const response = await api.get(`/bikes/owner/${user.id}`);
          if (response.data && Array.isArray(response.data)) {
            setBikes(response.data);
          } else {
            throw new Error("Invalid data format");
          }
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
        Alert.alert("Error", "Failed to load bikes");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5">
      {/* Drawer Menu Overlay */}
      <DrawerMenu
        visible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />

      {/* Header Section */}
      <View className="flex-row justify-between items-center mt-5">
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-teal-800">
          Welcome, {ownerName}! {/* Display owner's name */}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("OwnerProfile")}>
          <Ionicons name="person-outline" size={30} color="#175E5E" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View className="flex-row justify-between mt-5 mb-6">
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <Text className="text-lg font-bold text-gray-900">Total Rentals</Text>
          <Text className="text-xl text-[#175E5E]">12</Text>
        </View>
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <Text className="text-lg font-bold text-gray-900">
            Total Earnings
          </Text>
          <Text className="text-xl text-[#175E5E]">$200</Text>
        </View>
        <View className="bg-white p-4 rounded-lg w-28 items-center shadow-md">
          <Text className="text-lg font-bold text-gray-900">Bikes Count</Text>
          <Text className="text-xl text-[#175E5E]">{bikes.length}</Text>
        </View>
      </View>

      {/* Bikes Overview */}
      <Text className="text-2xl font-bold mb-4">Your Bikes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#175E5E" />
      ) : bikes.length > 0 ? (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center bg-white p-3 mb-3 rounded-lg shadow-md"
              onPress={() =>
                navigation.navigate("BikeDetails", { bikeId: item._id })
              }
            >
              <Image
                source={BikeImage}
                className="w-20 h-20 rounded-lg mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                {/* Display bike name */}
                <Text className="text-lg font-semibold text-[#175E5E]">
                  {item.bikeName || `Bike ${item._id}`}
                </Text>
                <Text className="text-gray-600">
                  Status: {item.isAvailable ? "Available" : "Not Available"}
                </Text>
                <Text className="text-gray-600">
                  Rental Price: ${item.rentalPrice}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#175E5E" />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-center text-lg text-gray-600">
          No bikes registered
        </Text>
      )}
    </SafeAreaView>
  );
};

export default OwnerHomeScreen;
