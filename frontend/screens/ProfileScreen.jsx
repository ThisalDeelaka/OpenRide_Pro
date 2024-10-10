import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import api from "../services/api"; // Assuming you have a service for API requests
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing token
import { FontAwesome } from "@expo/vector-icons"; // Icons for a modern look

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch user info from API or local storage (AsyncStorage)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Fetch token from AsyncStorage
        if (token) {
          // Make a POST request to fetch user profile
          const response = await api.post(
            "/users/profile",
            {}, // Empty body for POST request
            {
              headers: { Authorization: `Bearer ${token}` }, // Include token in headers
            }
          );
          setUser(response.data.user); // Assuming user data is inside response.data.user
        } else {
          navigation.navigate("Login"); // If no token, navigate to login
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        navigation.navigate("Login");
      } finally {
        setLoading(false); // Stop loading indicator once data is fetched
      }
    };

    fetchUser(); // Call the function to fetch user profile when the component mounts
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove token from local storage
      navigation.navigate("Login"); // Navigate to login screen
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  // Loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loaderText}>Loading profile...</Text>
      </View>
    );
  }

  // If no user is loaded, show an error
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: user.profileImage
              ? user.profileImage
              : "https://via.placeholder.com/150", // Placeholder image for profile picture
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <FontAwesome name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the ProfileScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  editProfileButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "#f00",
  },
});

export default ProfileScreen;
