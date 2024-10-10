import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import api from "../../services/api";

const AdminDashboardScreen = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/admin/analytics");
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">Admin Dashboard</Text>
      <Text>Total Users: {analytics.totalUsers}</Text>
      <Text>Total Bikes: {analytics.totalBikes}</Text>
      <Text>Total Rides: {analytics.totalRides}</Text>
      <Text>Total Revenue: ${analytics.totalRevenue}</Text>
      <Text>Pending Incidents: {analytics.totalIncidents}</Text>
      <Text>Bikes Under Maintenance: {analytics.bikesUnderMaintenance}</Text>
    </View>
  );
};

export default AdminDashboardScreen;
