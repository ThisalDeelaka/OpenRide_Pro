import React  from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity,Modal, Platform, InputAccessoryView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

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

function MassageInput( {massage, setMassage, onSend} ) {
  return (
    <View className="px-2 pb-2 bg-white flex-row items-center">
      <TextInput
        placeholder="Massage..."
        placeholderTextColor="#909090"
        className="flex-1 px-2 border border-gray-300 bg-white h-12"
        value={massage}
        onChangeText={setMassage}
      />
      <TouchableOpacity onPress={onSend}>
        <Ionicons name="send" size={30} color="#175E5E" style={{ marginHorizontal: 12 }} />
      </TouchableOpacity>
    </View>
  );
}

const SupportChatScreen = ({ navigation }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Manage drawer visibility
  const [userData, setUserData] = useState(null);
  const [massage,setMassage] = useState('');
  const [messages,setMessages] = useState([]);
  const [allmassages,setAllMassages] = useState([]);

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
      if (user) {
          fetchMessages(user.id);
      }
    });
    }, [userData]);

  const fetchMessages = async (id) => {
    try {
      const response = await api.get(`massage/getmassages/${id}`);
      setAllMassages(response.data.messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

  const onSend = async () => {
    console.log(massage)
    const cleanmsg = massage.replace(/\s/g, '').trim();
    if (cleanmsg === '') {
      return;
    }

    const newMessage = {
      userId: userData.id,
      userEmail: userData.email,
      content: massage,
      from: userData.role,
      
    };

    try {
      await api.post("/massage/send", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessages('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    console.log(newMessage)
    setMassage('');
  }

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
        {allmassages.map((message, index) => (
              <View 
                key={index}
                className={`flex p-0.5 ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                aria-label={`Message from ${message.from === 'user' ? 'you' : 'the assistant'}`}
              >
                <Text
                  className={`relative rounded-lg p-5 w-max max-w-xs ${
                    message.from === 'user' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  <Text className="text-sm">{message.content}</Text>
                  
                </Text>
              </View>
            ))}
        </View>
      </TouchableWithoutFeedback>

      {/* render MassageInput alter to the ios */}
      {Platform.OS === 'ios'? (
        <InputAccessoryView>
          <MassageInput massage={massage} setMassage={setMassage} onSend={onSend} />
        </InputAccessoryView>
      ):(
      <MassageInput massage={massage} setMassage={setMassage} onSend={onSend} />
      )}
      
    </SafeAreaView>
  );
};

export default SupportChatScreen;
