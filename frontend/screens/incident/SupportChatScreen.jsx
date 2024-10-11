import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

function MassageInput() {
  return(
    <View 
     style={
      { paddingHorizontal:10,
        paddingBottom:10,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center'
      }}>
    <TextInput placeholder='Massage...' placeholderTextColor='#909090'
    style={
      {
        flex:1,
        paddingHorizontal:10,
        boarderWidth:1,
        boarderColor:'#d0d0d0d0',
        backgroundColor:'white',
        height:50
      }
    }/>

    <TouchableOpacity>
      <Ionicons name="close" size={30} color="#175E5E" style={{marginHorizontal:12}} />
    </TouchableOpacity>


    </View>
  )
}

const SupportChatScreen = ({userData}) => {
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>

          <MassageInput />

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SupportChatScreen;
