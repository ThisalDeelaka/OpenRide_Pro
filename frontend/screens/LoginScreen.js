import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import api from "../services/api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data) {
        navigation.navigate("Home");
      }
    } catch (error) {
      setErrorMessage("Invalid login credentials");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#F3F4F6] p-6">
      {/* OpenRide Logo */}
      <Image
        source={{ uri: 'https://example.com/openride-logo.png' }} // Replace with your logo URL
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />

      {/* App Name */}
      <Text className="text-4xl font-extrabold text-[#175E5E] mb-2">OpenRide</Text>

      {/* Tagline */}
      <Text className="text-lg text-[#4A5568] mb-8">Your Bike. Your Ride. Your Way.</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
        style={{ elevation: 3 }}  // Subtle elevation for Android
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#A0AEC0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-white rounded-lg p-4 w-full max-w-md mb-4 shadow-md text-lg text-black"
        style={{ elevation: 3 }}  // Subtle elevation for Android
      />

      {/* Error Message */}
      {errorMessage ? (
        <Text className="text-red-500 mb-4 text-base">{errorMessage}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity
        className="bg-[#175E5E] rounded-full p-4 w-full max-w-md mb-4 shadow-md"
        onPress={handleLogin}
        activeOpacity={0.8}  // Button feedback on press
        style={{ elevation: 3 }}  // Subtle elevation for Android
      >
        <Text className="text-center text-white font-semibold text-lg">Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        className="w-full max-w-md"
        activeOpacity={0.8}  // Button feedback on press
      >
        <Text className="text-center text-[#4A5568] text-base mt-2">
          Don't have an account?{" "}
          <Text className="font-bold text-[#175E5E]">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
