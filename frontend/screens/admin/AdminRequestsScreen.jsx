import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AdminRegistrationRequests = ({ navigation }) => {
  // Hardcoded data for registration requests
  const [requests, setRequests] = useState([
    { id: "1", ownerName: "John Doe", bikeModel: "Model X", status: "pending" },
    { id: "2", ownerName: "Jane Smith", bikeModel: "Model Y", status: "pending" },
    { id: "3", ownerName: "Mike Johnson", bikeModel: "Model Z", status: "pending" },
  ]);

  // Function to handle acceptance of registration
  const acceptRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "accepted" } : request
      )
    );
  };

  // Render each request item
  const renderRequestItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 16,
        marginBottom: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }}
    >
      <View>
        {/* Text components wrapping all string content */}
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#175E5E" }}>
          {item.ownerName}
        </Text>
        <Text style={{ color: "#606060" }}>Bike Model: {item.bikeModel}</Text>
        <Text
          style={{
            color: item.status === "accepted" ? "#34D399" : "#F87171",
            fontSize: 14,
          }}
        >
          Status: {item.status}
        </Text>
      </View>

      {item.status === "pending" && (
        <TouchableOpacity
          onPress={() => acceptRequest(item.id)}
          style={{
            backgroundColor: "#34D399",
            padding: 12,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Accept</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 16 }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 24,
          backgroundColor: "#175E5E",
          height: 80,
          alignItems: "center",
        }}
      >
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* Wrap the title inside a Text component */}
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          Registration Requests
        </Text>

        {/* Empty View for alignment */}
        <View style={{ width: 30 }} />
      </View>

      {/* Registration Requests List */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", fontSize: 16, color: "#606060" }}>
            No pending requests
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AdminRegistrationRequests;
