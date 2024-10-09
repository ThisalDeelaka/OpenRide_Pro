import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import api from "../services/api";

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      const response = await api.get("/bikes");
      setBikes(response.data);
    };

    fetchBikes();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {bikes.map((bike) => (
          <Marker
            key={bike._id}
            coordinate={{
              latitude: bike.currentLocation.lat,
              longitude: bike.currentLocation.lng,
            }}
            title={`Bike ${bike._id}`}
          />
        ))}
      </MapView>
      <Button title="Start Ride" onPress={() => navigation.navigate("Ride")} />
    </View>
  );
};

export default HomeScreen;
