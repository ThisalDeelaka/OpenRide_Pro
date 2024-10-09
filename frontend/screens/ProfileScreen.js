import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import api from "../services/api"; // Assuming you have a service for API requests
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing token

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  // Fetch user info from API or local storage (AsyncStorage)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Assuming you store token
        const response = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUser();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token"); // Remove token from local storage
    navigation.navigate("Login"); // Navigate to login screen
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")} // Navigate to edit profile screen
      />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 18,
    color: "#555",
  },
});

export default ProfileScreen;
