import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // QR code generation library
import api from '../../services/api';

const GenerateQRCode = ({ route, navigation }) => {
  const { bikeName, rentalPrice, images, combinationLock } = route.params;
  const [bikeId, setBikeId] = useState(null);

  useEffect(() => {
    // Save the bike to the database and generate a unique bike ID
    const registerBike = async () => {
      try {
        const response = await api.post('/bikes/register', {
          bikeName,
          rentalPrice,
          images,
          combinationLock,
        });

        if (response.status === 201) {
          setBikeId(response.data._id); // Get unique bike ID
        } else {
          Alert.alert('Error', 'Failed to register bike.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to register bike.');
      }
    };

    registerBike();
  }, []);

  if (!bikeId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Generating QR Code...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-[#F3F4F6]">
      <Text className="text-2xl font-bold mb-4">Bike Registered</Text>
      <Text className="text-lg mb-6">Scan this QR code to rent the bike.</Text>

      {/* QR Code */}
      <QRCode value={bikeId} size={200} />

      {/* Bike ID */}
      <Text className="text-center text-gray-500 mt-4">Bike ID: {bikeId}</Text>

      {/* Finish Button */}
      <TouchableOpacity onPress={() => navigation.navigate('OwnerNav')} className="bg-[#175E5E] p-4 rounded-full mt-6">
        <Text className="text-white text-center font-bold">Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenerateQRCode;
