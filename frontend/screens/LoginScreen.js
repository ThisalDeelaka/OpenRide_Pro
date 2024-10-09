import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
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
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      
      {/* Add a button to navigate to the Sign Up screen */}
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

export default LoginScreen;
