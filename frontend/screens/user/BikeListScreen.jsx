import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const BikeListScreen = ({ route, navigation }) => {
  const { bikes } = route.params;  // Get the list of bikes passed from HomeScreen

  const renderBikeItem = ({ item }) => (
    <TouchableOpacity className="p-4 border-b border-gray-200">
      <Text className="text-lg">Bike ID: {item._id}</Text>
      <Text>Location: ({item.currentLocation.lat}, {item.currentLocation.lng})</Text>
      <Text>Status: {item.isAvailable ? "Available" : "Unavailable"}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Available Bikes</Text>

      {bikes.length > 0 ? (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item._id}
          renderItem={renderBikeItem}
        />
      ) : (
        <Text>No bikes available</Text>
      )}
    </View>
  );
};

export default BikeListScreen;
