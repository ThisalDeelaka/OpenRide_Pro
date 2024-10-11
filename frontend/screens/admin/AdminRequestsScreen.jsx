import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context"; // Handle safe areas

const AdminRegistrationRequests = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  // Fetch registration requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/bikes/");
        // Filter bikes where adminAccepted is false
        const pendingRequests = response.data.filter(bike => !bike.adminAccepted);
        setRequests(pendingRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Handle acceptance of registration
  const acceptRequest = async (id) => {
    try {
      const response = await api.put(`/bikes/upbikes/${id}`, {
        adminAccepted: true,
        status: "available",
      });

      // Update the state to reflect the changes
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, adminAccepted: true, status: "available" } : request
        )
      );
      Alert.alert("Request accepted", "The registration request has been accepted.");
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "Failed to accept the request.");
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
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#175E5E" }}>
          {item.ownerId.name}
        </Text>
        <Text style={{ color: "#606060", marginVertical: 4 }}>Bike Model: {item.bikeName}</Text>
        <Text
          style={{
            color: item.adminAccepted ? "#34D399" : "#F87171",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          Status: {item.adminAccepted ? "Accepted" : "Pending"}
        </Text>
      </View>

      {!item.adminAccepted && (
        <TouchableOpacity
          onPress={() => acceptRequest(item._id)}
          style={{
            backgroundColor: "#34D399",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Accept</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      {/* Header Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80, width: '100%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>Registration Requests</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Pending Requests List */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id} // Use _id as the key
        renderItem={renderRequestItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", fontSize: 16, color: "#606060", marginTop: 20 }}>
            No pending requests
          </Text>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AdminRegistrationRequests;
