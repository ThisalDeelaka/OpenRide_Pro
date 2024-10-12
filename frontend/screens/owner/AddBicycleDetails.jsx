import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AddBicycleDetails = ({ navigation }) => {
  const [bikeName, setBikeName] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [images, setImages] = useState([null, null, null]); // Store 3 images
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to set the bike location.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoadingLocation(false);
    })();
  }, []);

  // Function to request permission and select an image
  const selectImage = async (index) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newImages = [...images];
      newImages[index] = result.uri;
      setImages(newImages);
    }
  };

  const handleNext = () => {
    if (!bikeName || !rentalPrice) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
  
    const bikeLocation = selectedLocation || currentLocation;
  
    // Ensure the location is valid before proceeding
    if (!bikeLocation || !bikeLocation.latitude || !bikeLocation.longitude) {
      Alert.alert('Error', 'Please select a valid location.');
      return;
    }
  
    // Convert the location to { lat: ..., lng: ... } format
    const formattedLocation = {
      lat: bikeLocation.latitude,
      lng: bikeLocation.longitude,
    };
  
    // Navigate to the next page with properly formatted data
    navigation.navigate('AddCombinationLock', {
      bikeName, // Ensure the bike name is passed
      rentalPrice,
      currentLocation: formattedLocation, // Pass formatted location
      images,
    });
  };
  

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      {/* Header */}
      <View className="flex-row items-center p-6 bg-[#175E5E]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white ml-4">Add Bicycle Details</Text>
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>

        {/* Bike Name Input */}
        <View>
          <Text className="text-lg font-medium text-[#1F2937] mb-2">Bike Name</Text>
          <TextInput
  placeholder="Enter Bike Name"
  value={bikeName}
  onChangeText={setBikeName}
  className="bg-white p-4 rounded-xl shadow-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#175E5E]"
  style={{ color: 'black' }} // This will set the input text color to black
/>

        </View>

        {/* Rental Price Input */}
        <View className="mt-4">
          <Text className="text-lg font-medium text-[#1F2937] mb-2">Rental Price ($)</Text>
          <TextInput
  placeholder="Enter Rental Price"
  value={rentalPrice}
  onChangeText={setRentalPrice}
  keyboardType="numeric"
  className="bg-white p-4 rounded-xl shadow-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#175E5E]"
  style={{ color: 'black' }} // This will set the input text color to black
/>

        </View>

        {/* Bike Location on Map */}
        <View className="mt-4">
          <Text className="text-lg font-medium text-[#1F2937] mb-2">Select Bike Location</Text>
          {loadingLocation ? (
            <ActivityIndicator size="large" color="#175E5E" />
          ) : (
            <MapView
              style={{ height: 300, width: '100%', borderRadius: 20, overflow: 'hidden' }}
              initialRegion={currentLocation}
              onPress={handleMapPress}
            >
              {selectedLocation ? (
                <Marker
                  coordinate={selectedLocation}
                  title="Selected Location"
                  description="This is where the bike is located."
                />
              ) : (
                <Marker
                  coordinate={currentLocation}
                  title="Current Location"
                  description="Your current location"
                />
              )}
            </MapView>
          )}
        </View>

        {/* Image Uploads (Optional) */}
        <Text className="text-lg font-medium text-[#1F2937] mt-4 mb-2">Upload Bike Images</Text>
        <View className="flex-row justify-between">
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectImage(index)}
              className="w-[30%] bg-[#E5E7EB] rounded-lg h-28 justify-center items-center shadow-md"
            >
              {image ? (
                <Image source={{ uri: image }} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <Ionicons name="camera" size={28} color="#6B7280" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Next Button - Sticky at the Bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#F3F4F6] border-t border-gray-200">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-[#175E5E] py-4 rounded-full shadow-lg"
        >
          <Text className="text-white text-center text-lg font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBicycleDetails;
