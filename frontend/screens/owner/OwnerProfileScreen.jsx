import { Button, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const OwnerProfileScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddBicycle")}
        className="w-full max-w-md"
        activeOpacity={0.8}
      >
        <Text className="text-center text-[#4A5568] text-base mt-2">
          Add Bicycle
          
        </Text>
      </TouchableOpacity>
    
    </View>
  )
}

export default OwnerProfileScreen

const styles = StyleSheet.create({})