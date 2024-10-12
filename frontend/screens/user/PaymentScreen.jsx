import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; 

const PaymentScreen = ({ route, navigation }) => {
  const { totalSpend } = route.params; 
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("creditCard"); 

  const handlePayment = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Payment Success", "Your payment has been successfully processed.");
      navigation.navigate("UserHome"); 
    }, 2000);
  };

  const formattedTotal = parseFloat(totalSpend).toFixed(2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80, alignItems: 'center', elevation: 5 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold' }}>Payment</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Total Amount Section */}
      <View style={{ padding: 16, alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#424242' }}>Total: {formattedTotal} LKR</Text>
      </View>

      {/* Payment Method Section */}
      <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
        <Text style={{ fontSize: 18, color: '#175E5E', marginBottom: 20 }}>Select Payment Method:</Text>

        {/* Credit Card Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("creditCard")}
          style={{
            backgroundColor: selectedMethod === "creditCard" ? "#E8F8A1" : "#FFF",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            borderWidth: selectedMethod === "creditCard" ? 1.5 : 0,
            borderColor: "#175E5E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name="card-outline" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 15, fontSize: 18, color: "#424242" }}>Credit Card</Text>
        </TouchableOpacity>

        {/* PayPal Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("paypal")}
          style={{
            backgroundColor: selectedMethod === "paypal" ? "#E8F8A1" : "#FFF",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            borderWidth: selectedMethod === "paypal" ? 1.5 : 0,
            borderColor: "#175E5E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name="logo-paypal" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 15, fontSize: 18, color: "#424242" }}>PayPal</Text>
        </TouchableOpacity>

        {/* In-App Wallet Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("wallet")}
          style={{
            backgroundColor: selectedMethod === "wallet" ? "#E8F8A1" : "#FFF",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: selectedMethod === "wallet" ? 1.5 : 0,
            borderColor: "#175E5E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name="wallet-outline" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 15, fontSize: 18, color: "#424242" }}>In-App Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: "#175E5E",
          padding: 18,
          borderRadius: 50,
          marginHorizontal: 16,
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: isLoading ? 0.7 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="checkmark-circle-outline" size={24} color="#FFF" />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 8 }}>Pay Now</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentScreen;
