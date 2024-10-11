import React  from 'react';
import { View, Text,SafeAreaView,TouchableOpacity,Modal } from 'react-native';
import { Ionicons} from "@expo/vector-icons";
import { useState } from 'react';

const DrawerMenu = ({ visible, onClose,navigation }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar Drawer */}
        <View className="w-64 bg-white h-full p-5">
          <TouchableOpacity onPress={onClose} className="mb-6">
            <Ionicons name="close" size={30} color="#175E5E" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#175E5E] mb-5">Menu</Text>

          <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.navigate("UserHome")}>
            <Ionicons name="home-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Home</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.navigate("MyWallet")}>
            <Ionicons name="wallet-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">My Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.navigate("History")}>
            <Ionicons name="time-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">History</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.navigate("FAQ")}>
            <Ionicons name="help-circle-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("SupportChat")}>
            <Ionicons name="chatbox-outline" size={22} color="#175E5E" />
            <Text className="ml-4 text-lg text-[#175E5E]">Support Chat</Text>
          </TouchableOpacity>
        </View>
        
        {/* Overlay to close the drawer */}
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
};
const MyWalletScreen = ({navigation}) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Manage drawer visibility

  return (
    
    <SafeAreaView className="flex-1 bg-gray-50 px-5 mt-10">
      <DrawerMenu visible={isDrawerVisible} onClose={() => setDrawerVisible(false)} navigation={navigation} />

      <View className="flex-row justify-between items-center mt-5">
        {/* Hamburger Menu Icon on the left */}
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#175E5E" />
        </TouchableOpacity>

          <View>
            <Text className="text-3xl font-bold text-teal-800">My Wallet</Text>
            <Text className="text-lg text-gray-500 mt-1">Your OpenRide Wallet</Text>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default MyWalletScreen;
