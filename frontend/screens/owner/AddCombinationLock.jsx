import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddCombinationLock = ({ route, navigation }) => {
  const { bikeName, rentalPrice, images } = route.params; // Bike details from previous screen
  const [combinationLock, setCombinationLock] = useState('');

  const handleNext = () => {
    if (!combinationLock) {
      Alert.alert('Error', 'Please enter the combination lock code.');
      return;
    }

    // Navigate to QR code generation page with all the data
    navigation.navigate('GenerateQRCode', {
      bikeName,
      rentalPrice,
      images,
      combinationLock,
    });
  };

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      {/* Header */}
      <View className="flex-row items-center p-6 bg-[#175E5E] shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white ml-4">Add Combination Lock</Text>
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        
        {/* Lock Image with rounded corners */}
        <View className="mb-6 justify-center items-center">
          <Image
            source={require('../../assets/lock.jpg')} 
            style={{ width: 350, height: 400, borderRadius: 10 }} 
            resizeMode="cover"
          />
        </View>

        {/* Combination Lock Input */}
        <View className="mb-8">
          <Text className="text-lg font-medium text-[#1F2937] mb-2">Enter Combination Lock Code</Text>
          <TextInput
            placeholder="Enter Combination Lock Code"
            value={combinationLock}
            onChangeText={setCombinationLock}
            keyboardType="numeric"
            className="bg-white p-4 rounded-xl shadow-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#175E5E]"
          />
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

export default AddCombinationLock;
