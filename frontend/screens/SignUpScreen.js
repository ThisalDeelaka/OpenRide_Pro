import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Animated } from "react-native";
import api from "../services/api"; // Your axios instance to handle API requests

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user"); // Default account type is 'user'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [togglePosition] = useState(new Animated.Value(0)); // For animated toggle

  // Handle toggle animation and selection
  const handleToggle = (type) => {
    setAccountType(type);
    // Animate toggle to the appropriate position
    Animated.timing(togglePosition, {
      toValue: type === "user" ? 0 : 1, // 0 for "user", 1 for "bikeOwner"
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Calculate toggle indicator position
  const toggleLeft = togglePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["5%", "55%"], // Adjust positions based on layout
  });

  // Handle Sign Up
  const handleSignUp = async () => {
    const validationErrors = {};

    if (!name) validationErrors.name = "Name is required";
    if (!email || !email.includes("@")) validationErrors.email = "Please enter a valid email";
    if (!password || password.length < 6) validationErrors.password = "Password must be at least 6 characters long";

    // If there are validation errors, stop execution and display the error messages
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors); // Set the error object
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/users/register", { name, email, password, accountType });
      if (response.data) {
        setSuccessMessage("Account created successfully! Please log in.");
        setErrorMessage(""); // Clear error message on success
        navigation.navigate("Login"); // Navigate to Login after successful signup
      }
    } catch (error) {
      setErrorMessage("Error signing up. Please try again.");
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#F3F4F6] p-6">

      {/* App Name */}
      <Text className="text-4xl font-extrabold text-[#175E5E] mb-2">OpenRide</Text>

      {/* Tagline */}
      <Text className="text-lg text-[#4A5568] mb-8">Join Us and Start Your Ride!</Text>

      {/* Modern Toggle Design */}
      <View className="w-full max-w-md h-14 mb-8 bg-[#EDEFF1] rounded-full relative shadow-md" style={{ elevation: 5 }}>
        {/* Sliding Toggle Indicator */}
        <Animated.View
          style={{
            position: "absolute",
            top: 3,
            left: toggleLeft,
            width: "40%",
            height: "90%",
            backgroundColor: "#175E5E",
            borderRadius: 30, // Fully rounded indicator
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
        
        {/* Toggle Buttons */}
        <View className="flex-row justify-between w-full h-full">
          <TouchableOpacity
            onPress={() => handleToggle("user")}
            className="flex-1 justify-center items-center"
            activeOpacity={0.8}
          >
            <Text className={`text-lg font-medium ${accountType === "user" ? "text-white" : "text-[#4A5568]"}`}>
              Normal User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleToggle("bikeOwner")}
            className="flex-1 justify-center items-center"
            activeOpacity={0.8}
          >
            <Text className={`text-lg font-medium ${accountType === "bikeOwner" ? "text-white" : "text-[#4A5568]"}`}>
              Bike Owner
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="#A0AEC0"
        value={name}
        onChangeText={setName}
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
        style={{ elevation: 3 }} // Subtle elevation for form fields
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
        style={{ elevation: 3 }} // Subtle elevation for form fields
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#A0AEC0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
        style={{ elevation: 3 }} // Subtle elevation for form fields
      />

      {/* Error Messages */}
      {errorMessage && typeof errorMessage === "object" ? (
        Object.values(errorMessage).map((msg, index) => (
          <Text key={index} className="text-red-500 mb-4 text-base">{msg}</Text>
        ))
      ) : (
        <Text className="text-red-500 mb-4 text-base">{errorMessage}</Text>
      )}

      {/* Success Message */}
      {successMessage ? <Text className="text-green-500 mb-4 text-base">{successMessage}</Text> : null}

      {/* Sign Up Button */}
      <TouchableOpacity
        className={`bg-[#175E5E] rounded-full p-4 w-full max-w-md mb-4 shadow-md ${loading && "opacity-50"}`}
        onPress={handleSignUp}
        disabled={loading}
        activeOpacity={0.8}
        style={{ elevation: 3 }}  // Subtle elevation for button
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold text-lg">Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="w-full max-w-md"
        activeOpacity={0.8}
      >
        <Text className="text-center text-[#4A5568] text-base mt-2">
          Already have an account?{" "}
          <Text className="font-bold text-[#175E5E]">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
