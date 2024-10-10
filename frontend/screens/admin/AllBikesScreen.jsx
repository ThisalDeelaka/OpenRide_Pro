import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../../services/api';
const AllBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch bikes from the backend using axios
  const fetchBikes = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await api.get('/bikes/'); // Replace with your actual backend URL
      setBikes(response.data); // Set the fetched bikes to state
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to load bikes');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // useEffect to fetch bikes when the component loads
  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Bikes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.bikeItem}>
              <Text>Owner: {item.ownerId.name}</Text>
              <Text>Location: {item.currentLocation.lat}, {item.currentLocation.lng}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Rental Price: ${item.rentalPrice}</Text>
            </View>
          )}
        />
      )}

      {/* Reload Button */}
      <Button title="Reload Bikes" onPress={fetchBikes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bikeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AllBikesScreen;
