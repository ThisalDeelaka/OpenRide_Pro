import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import BikeImage from '../../assets/bike.png'; // Assuming the image is in the assets folder

const BikeListScreen = ({ route, navigation }) => {
  const { bikes } = route.params; // Get the list of bikes passed from HomeScreen

  const renderBikeItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center bg-white p-3 mb-3 rounded-lg shadow-md"
      onPress={() => navigation.navigate("BikeDetails", { bikeId: item._id })} // Navigate to bike details
    >
      {/* Bike Image from assets */}
      <Image
        source={BikeImage}
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="contain"
      />

      {/* Bike Details */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-[#175E5E] mb-2">
          {item.bikeName}
        </Text>

        <View className="flex-row items-center justify-between">
          {/* Availability Status */}
          <View className="flex-row items-center">
            <Text
              className={`mr-2 text-sm font-medium ${
                item.status === "available" ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.status === "available" ? "Available" : "Unavailable"}
            </Text>
          </View>

          {/* Distance Placeholder */}
          <View className="flex-row items-center bg-gray-200 px-2 py-1 rounded-full">
            <Text className="text-gray-700 text-sm">Distance: {item.distance || 0} km</Text>
          </View>
        </View>

        {/* Location */}
        <Text className="text-sm text-gray-600">Location: {item.currentLocation.lat}, {item.currentLocation.lng}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="bg-[#175E5E] p-2 px-6 rounded-full">
            <Text className="text-white text-lg">←</Text>
          </View>
        </TouchableOpacity>
        
        {/* Location Info */}
        <View className="flex-1 mx-4">
          <Text className="text-2xl font-bold text-[#175E5E]">Spot 21</Text>
          <Text className="text-sm text-gray-600">Pittugala, Malabe</Text>
        </View>

        {/* Distance Indicator */}
        <View className="flex-row items-center">
          <Text className="text-gray-600 mr-2">3.6 km</Text>
          <Text className="text-lg">🚶</Text>
        </View>
      </View>

      {/* Bike List */}
      {bikes.length > 0 ? (
        <FlatList
          data={bikes}  // Showing all bikes
          keyExtractor={(item) => item._id}
          renderItem={renderBikeItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-center text-lg text-gray-600">
          No bikes available
        </Text>
      )}
    </View>
  );
};

export default BikeListScreen;
