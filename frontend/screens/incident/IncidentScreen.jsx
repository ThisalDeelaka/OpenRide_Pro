import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import api from "../../services/api";

const IncidentReportingScreen = ({ navigation, route }) => {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { bikeId } = route.params; // Pass bikeId when navigating from the Ride screen

  const handleReportIncident = async () => {
    try {
      await api.post("/incidents/report", {
        bikeId,
        description,
      });
      setMessage("Incident reported successfully");
      setDescription(""); // Clear input after success
    } catch (error) {
      setMessage("Error reporting incident");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Report an Incident</Text>
      <TextInput
        className="border p-2 w-full mb-4"
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Report Incident" onPress={handleReportIncident} />
      {message ? <Text className="mt-4">{message}</Text> : null}
    </View>
  );
};

export default IncidentReportingScreen;
