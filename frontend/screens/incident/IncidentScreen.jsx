import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
// Remove the api import if not using backend temporarily
// import api from "../../services/api"; 

const IncidentReportingScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Hardcoded bikeId
  const bikeId = "12345"; // Replace this with your desired hardcoded ID

  const handleReportIncident = async () => {
    try {
      // Since you're not connecting to the backend, we'll simulate a successful response
      // In real code, you would send the request to the backend
      // await api.post("/incidents/report", {
      //   bikeId,
      //   description,
      // });

      setMessage(`Incident for bike ${bikeId} reported successfully`);
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
