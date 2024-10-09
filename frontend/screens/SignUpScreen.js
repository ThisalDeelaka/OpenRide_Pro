import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import api from "../services/api"; // Your axios instance to handle API requests

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await api.post("/users/register", { name, email, password });
      if (response.data) {
        setSuccessMessage("Account created successfully! Please log in.");
        setErrorMessage(""); // Clear error message on success
        navigation.navigate("Login"); // Navigate to Login after successful signup
      }
    } catch (error) {
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Sign Up</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="border p-2 my-2 w-3/4"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-2 my-2 w-3/4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border p-2 my-2 w-3/4"
      />
      {errorMessage ? <Text className="text-red-500">{errorMessage}</Text> : null}
      {successMessage ? <Text className="text-green-500">{successMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default SignUpScreen;
