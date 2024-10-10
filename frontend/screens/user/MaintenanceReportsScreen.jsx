import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import api from "../../services/api";

const MaintenanceReportsScreen = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchMaintenanceReports = async () => {
      try {
        const response = await api.get("/admin/maintenance");
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching maintenance reports:", error);
      }
    };

    fetchMaintenanceReports();
  }, []);

  const handleResolveMaintenance = async (bikeId) => {
    try {
      await api.put("/admin/maintenance/resolve", { bikeId });
      setBikes(bikes.filter((bike) => bike._id !== bikeId)); // Remove resolved bike from the list
    } catch (error) {
      console.error("Error resolving maintenance:", error);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">Maintenance Reports</Text>
      {bikes.length === 0 ? (
        <Text>No bikes under maintenance</Text>
      ) : (
        bikes.map((bike) => (
          <View key={bike._id} className="border p-2 mb-4">
            <Text>Bike ID: {bike._id}</Text>
            <Text>Owner: {bike.ownerId.name}</Text>
            <Button title="Mark as Available" onPress={() => handleResolveMaintenance(bike._id)} />
          </View>
        ))
      )}
    </View>
  );
};

export default MaintenanceReportsScreen;
