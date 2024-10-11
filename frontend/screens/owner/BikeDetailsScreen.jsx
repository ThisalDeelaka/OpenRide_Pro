import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BikeImage from "../../assets/bike.png"; 
import * as Location from "expo-location"; 
import { styled } from "nativewind"; // NativeWind CSS support

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const BikeDetailsScreen = ({ route, navigation }) => {
  const { bike } = route.params; 
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#175E5E" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!currentLocation) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-lg text-red-500">Unable to fetch your location.</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="flex-row justify-between items-center px-4 py-4 bg-[#175E5E] h-20">
        <StyledTouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </StyledTouchableOpacity>
        <StyledText className="text-white text-xl font-bold">Bike Details</StyledText>
        <StyledView className="w-8" />
      </StyledView>

      {/* Map Section */}
      <StyledView className="mx-4 mt-4 mb-2 rounded-lg overflow-hidden" style={{ height: 350 }}>
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }}
  >
    <Marker
      coordinate={currentLocation}
      title="Your Location"
      description="This is your current location"
    />
  </MapView>
</StyledView>


      {/* Bike Image and Info */}
      <StyledView className="p- bg-white shadow-lg flex-row items-center justify-center rounded-lg mx-4 mt-2">
        <StyledImage source={BikeImage} className="w-40 h-40" resizeMode="contain" />
        <StyledView className="ml-6">
          <StyledText className="text-lg font-bold text-[#175E5E]">{bike.bikeName || "Bike"}</StyledText>
          <StyledText className="text-gray-600">Status: {bike.status || "Unknown"}</StyledText>
        </StyledView>
      </StyledView>

      {/* Action Buttons */}
      <StyledView className="flex-row justify-between mt-6 mx-6">
        {/* Maintenance Button */}
        <StyledTouchableOpacity
          onPress={() => alert('Bike marked for maintenance')}
          className="bg-yellow-600 p-4 rounded-full flex-row justify-center items-center flex-1 mr-2"
        >
          <Ionicons name="construct-outline" size={24} color="#FFF" />
          <StyledText className="text-white text-lg font-bold ml-2">Maintenance</StyledText>
        </StyledTouchableOpacity>

        {/* Remove Bike Button */}
        <StyledTouchableOpacity
          onPress={() => alert('Bike removed')}
          className="bg-red-600 p-4 rounded-full flex-row justify-center items-center flex-1 ml-2"
        >
          <Ionicons name="trash-outline" size={24} color="#FFF" />
          <StyledText className="text-white text-lg font-bold ml-2">Remove</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default BikeDetailsScreen;
