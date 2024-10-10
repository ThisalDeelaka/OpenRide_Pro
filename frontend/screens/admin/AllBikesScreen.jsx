import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import BikeImage from '../../assets/bike.png'; // Assuming bike image is stored here

const AllBikesScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch bikes from the backend
  const fetchBikes = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await api.get('/bikes/'); // Replace with your actual backend URL
      const fetchedBikes = response.data.map(bike => ({
        ...bike,
        isAvailable: true // Set all bikes available by default
      }));
      setBikes(fetchedBikes); // Set the fetched bikes to state
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to load bikes');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Simulate toggling bike availability
  const toggleAvailability = (bikeId) => {
    setBikes(prevBikes =>
      prevBikes.map(bike =>
        bike._id === bikeId ? { ...bike, isAvailable: !bike.isAvailable } : bike
      )
    );
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Header with Back Button and Title in a single row */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#175E5E" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold ml-4 text-teal-800">All Bikes</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#175E5E" />
      ) : error ? (
        <Text className="text-red-500 text-lg mb-4">{error}</Text>
      ) : (
        <FlatList
          data={bikes}
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
                <Text className="text-gray-600">Rental Price: ${item.rentalPrice}</Text>
              </View>

              {/* Toggle Button for Availability */}
              <View className="flex-row items-center">
                <Text className={`mr-2 ${item.isAvailable ? 'text-[#182667]' : 'text-red-600'}`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </Text>
                <Switch
                  value={item.isAvailable}
                  onValueChange={() => toggleAvailability(item._id)}
                  trackColor={{ false: '#ccc', true: '#182667' }} // Change available color to #182667
                  thumbColor={item.isAvailable ? '#182667' : '#f4f3f4'}
                />
              </View>
            </View>
          )}
        />
      )}

      {/* Reload Button */}
      <TouchableOpacity
        className="bg-[#175E5E] p-4 rounded-lg mt-4"
        onPress={fetchBikes}
      >
        <Text className="text-center text-white text-lg font-bold">Reload Bikes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllBikesScreen;
