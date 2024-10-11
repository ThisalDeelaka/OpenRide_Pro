import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AdminRequestsScreen = ({ navigation }) => {
  // Hardcoded registration requests
  const [requests, setRequests] = useState([
    { id: '1', ownerName: 'John Doe', bikeName: 'Yamaha R15', registrationId: 'REG12345', status: 'Pending' },
    { id: '2', ownerName: 'Jane Smith', bikeName: 'Honda CB500', registrationId: 'REG54321', status: 'Pending' },
    { id: '3', ownerName: 'Mike Johnson', bikeName: 'Suzuki GSX-R750', registrationId: 'REG98765', status: 'Pending' },
  ]);

  // Function to handle accept action
  const handleAccept = (id) => {
    Alert.alert(
      "Confirm Acceptance",
      "Are you sure you want to accept this registration?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            setRequests((prevRequests) =>
              prevRequests.map((request) =>
                request.id === id ? { ...request, status: "Accepted" } : request
              )
            );
            Alert.alert("Success", "Registration accepted.");
          },
        },
      ]
    );
  };

  // Render each request item
  const renderRequest = ({ item }) => {
    return (
      <View className="flex-row items-center bg-white p-4 mb-3 rounded-lg shadow-md">
        <View className="flex-1">
          <Text className="text-lg font-bold text-[#175E5E]">{item.ownerName}</Text>
          <Text className="text-sm text-gray-500">Bike: {item.bikeName}</Text>
          <Text className="text-sm text-gray-500">Reg ID: {item.registrationId}</Text>
          <Text className={`text-sm font-medium ${item.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
            Status: {item.status}
          </Text>
        </View>

        {/* Accept Button */}
        {item.status === 'Pending' && (
          <TouchableOpacity
            onPress={() => handleAccept(item.id)}
            className="bg-green-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-bold">Accept</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F3F4F6] p-4">
      {/* Header Section */}
      <View className="flex-row items-center justify-between p-6 bg-[#175E5E] h-20">
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full p-2">
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <Text className="text-white text-lg">Vehicle Registration Requests</Text>

        <View style={{ width: 30 }} /> {/* Empty view for alignment */}
      </View>

      {/* List of Requests */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className="text-center text-lg text-gray-600">No pending requests</Text>
        )}
      />
    </View>
  );
};

export default AdminRequestsScreen;
