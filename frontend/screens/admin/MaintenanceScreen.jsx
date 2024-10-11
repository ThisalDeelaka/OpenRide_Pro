import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Switch, TouchableOpacity, TextInput, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import BikeImage from '../../assets/bike.png'; // Assuming bike image is stored here

const AdminMaintenanceScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [maintenanceHours, setMaintenanceHours] = useState(100); // Default threshold of 100 hours
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bikes data from backend
  const fetchBikes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/bikes/'); // Replace with actual API call
      const updatedBikes = response.data.map(bike => ({
        ...bike,
        isUnderMaintenance: bike.status === 'maintenance' // Update the status from backend data
      }));
      setBikes(updatedBikes);
      // Filter bikes that are unavailable (under maintenance)
      setFilteredBikes(updatedBikes.filter(bike => bike.isUnderMaintenance));
      setError(null);
    } catch (err) {
      setError('Failed to load bikes');
    } finally {
      setLoading(false);
    }
  };

  // Toggle maintenance status of a bike
  const toggleMaintenance = async (bikeId, currentStatus) => {
    try {
      const newStatus = !currentStatus ? 'maintenance' : 'available';
      await api.put('/bikes/update-status', { bikeId, status: newStatus });
      
      // Update the local state with the new status
      setBikes(prevBikes =>
        prevBikes.map(bike =>
          bike._id === bikeId ? { ...bike, isUnderMaintenance: !currentStatus } : bike
        )
      );
      
      // Update the filtered list to only show bikes that are under maintenance
      setFilteredBikes(prevBikes =>
        prevBikes.map(bike =>
          bike._id === bikeId ? { ...bike, isUnderMaintenance: !currentStatus } : bike
        ).filter(bike => bike.isUnderMaintenance) // Only show under maintenance bikes
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to update bike status');
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Header with Back Button and Title */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#175E5E" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold ml-4 text-teal-800">Maintenance</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#175E5E" />
      ) : error ? (
        <Text className="text-red-500 text-lg mb-4">{error}</Text>
      ) : filteredBikes.length === 0 ? (
        <Text className="text-lg text-teal-800">No bikes under maintenance</Text>
      ) : (
        <FlatList
          data={filteredBikes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-4 rounded-lg shadow-md flex-row items-center">
              {/* Bike Image */}
              <Image
                source={BikeImage}
                className="w-24 h-24 rounded-lg mr-4"
                resizeMode="contain"
              />
              
              {/* Bike Details */}
              <View className="flex-1">
                <Text className="text-lg font-semibold text-teal-800">{item.name || `Bike ${item._id}`}</Text>
                <Text className="text-gray-600">Owner: {item.ownerId.name || 'Unknown Owner'}</Text>
                <Text className="text-gray-600">Run Hours: {item.runHours} hrs</Text>
              </View>

              {/* Toggle Maintenance Status */}
              <View className="flex-row items-center">
                <Text className={`mr-2 ${item.isUnderMaintenance ? 'text-red-600' : 'text-[#175E5E]'}`}>
                  {item.isUnderMaintenance ? 'Under Maintenance' : 'Available'}
                </Text>
                <Switch
                  value={item.isUnderMaintenance}
                  onValueChange={() => toggleMaintenance(item._id, item.isUnderMaintenance)}
                  trackColor={{ false: '#ccc', true: '#FF6B6B' }} // Red color for under maintenance
                  thumbColor={item.isUnderMaintenance ? '#FF6B6B' : '#f4f3f4'}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default AdminMaintenanceScreen;
