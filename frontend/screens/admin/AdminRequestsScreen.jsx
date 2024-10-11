import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

const AdminRegistrationRequests = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  // Fetch registration requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/bikes/"); // Fetch bikes from the backend
        // Filter bikes where adminAccepted is false
        const pendingRequests = response.data.filter(bike => !bike.adminAccepted);
        setRequests(pendingRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Function to handle acceptance of registration
  const acceptRequest = async (id) => {
    try {
      const response = await api.put(`/bikes/upbikes/${id}`, { 
        adminAccepted: true,
        status: "available" // Update the bike's status to available
      });

      // Update the state to reflect the changes
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, adminAccepted: true, status: "available" } : request
        )
      );
      console.log("Request accepted:", response.data); // Log the updated bike data
    } catch (error) {
      console.error("Error accepting request:", error);
    }
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
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#175E5E" }}>
          {item.ownerId.name} {/* Assuming ownerId has a name property */}
        </Text>
        <Text style={{ color: "#606060" }}>Bike Model: {item.bikeName}</Text>
        <Text
          style={{
            color: item.adminAccepted ? "#34D399" : "#F87171",
            fontSize: 14,
          }}
        >
          Status: {item.adminAccepted ? "Accepted" : "Pending"}
        </Text>
      </View>

      {!item.adminAccepted && (
        <TouchableOpacity
          onPress={() => acceptRequest(item._id)} // Use _id for the MongoDB ID
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          Registration Requests
        </Text>

        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item._id} // Use _id as the key
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
