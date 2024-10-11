import React  from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity,Modal, Platform, InputAccessoryView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

const DrawerMenu = ({ visible, onClose, navigation }) => {
    return (
      <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 flex-row">
          {/* Sidebar Drawer */}
          <View className="w-64 bg-white h-full p-6 shadow-lg">
            <TouchableOpacity onPress={onClose} className="mb-6">
              <Ionicons name="close" size={30} color="#175E5E" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-[#175E5E] mb-6">Menu</Text>
  
            {/* Drawer Menu Items */}
            {[
              { name: "AllBikes", icon: "bicycle", label: "All Bikes" },
              { name: "Notifications", icon: "notifications-outline", label: "Notifications" },
              { name: "Security", icon: "shield-checkmark-outline", label: "Security" },
              { name: "AdminMaintain", icon: "construct-outline", label: "Maintenance" },
              { name: "AllUsers", icon: "people-outline", label: "All Users" },
              { name: "AllOwners", icon: "business-outline", label: "All Owners" },
              { name: "Fields", icon: "leaf-outline", label: "Fields" },
              {name: "AdminSupportChat", icon: "chatbox-ellipses-outline", label: "Support Chat"},
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                className="flex-row items-center mb-5" 
                onPress={() => {
                  onClose(); // Close the drawer
                  navigation.navigate(item.name); // Navigate to the appropriate screen
                }}
                style={{ shadowOpacity: 0.3, shadowRadius: 4 }}
              >
                <Ionicons name={item.icon} size={24} color="#175E5E" />
                <Text className="ml-4 text-lg text-[#333]">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Overlay to close the drawer */}
          <TouchableOpacity className="flex-1" onPress={onClose} />
        </View>
      </Modal>
    );
  };

const SupportChatScreen = ({ navigation }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Manage drawer visibility
  const [userData, setUserData] = useState(null);
  const [users,setUsers] = useState([]);


  useEffect(() => {
    const getUserInfo = async() => {
      try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        console.log(e)
      }
    }
      getUserInfo().then(user => {
      setUserData(user);
    });
    }, [userData]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/massage/getusers");
      setUsers(response.data.messages);
      console.log(users);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    useEffect(() => {
        fetchUsers();
        }, [users]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5 mt-5">
      <DrawerMenu visible={isDrawerVisible} onClose={() => setDrawerVisible(false)} navigation={navigation} />

      <View className="flex-row justify-between items-center mt-5">
        {/* Hamburger Menu Icon on the left */}
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>

        <View>
          <Text className="text-3xl font-bold text-teal-800">Support chat</Text>
          <Text className="text-lg text-gray-500 mt-1">Get support on any inconvenience </Text>
        </View>

        </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className='flex-1'>
        <View className="flex-1">
        
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SupportChatScreen;
