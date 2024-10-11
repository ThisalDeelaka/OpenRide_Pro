import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LockImage from "../../assets/unlock.png"; 

const UnlockCodeScreen = ({ route, navigation }) => {
  const { unlockCode } = route.params; 

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80 }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* "Your Bike" Section */}
        <TouchableOpacity style={{ backgroundColor: '#DAEBF0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="bicycle-outline" size={20} color="#175E5E" />
          <Text style={{ color: '#175E5E', marginLeft: 8 }}>Your Bike</Text>
        </TouchableOpacity>

        {/* Empty View for alignment */}
        <View style={{ width: 30 }} />
      </View>

      {/* Unlock Code Section */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        {/* Lock Image - Increased Size */}
        <Image source={LockImage} style={{ width: 400, height: 400 }} resizeMode="contain" />

        {/* Unlock Code */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 0 }}>Your Unlock Code</Text>
        <View style={{ backgroundColor: '#f0f0f0', padding: 16, marginTop: 16, borderRadius: 10, elevation: 2 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{unlockCode}</Text>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={{ padding: 16 }}>
        {/* Broken Bike Button */}
        <TouchableOpacity
          onPress={() => {/* Handle broken bike report */}}
          style={{ backgroundColor: '#7EF192', paddingVertical: 16, borderRadius: 50, marginBottom: 16 }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Broken bike</Text>
        </TouchableOpacity>

        {/* Done Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}  // Assuming 'Home' is the destination
          style={{ backgroundColor: '#202A43', paddingVertical: 16, borderRadius: 50 }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UnlockCodeScreen;
