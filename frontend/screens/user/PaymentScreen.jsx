import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; // For handling screen notches

const PaymentScreen = ({ route, navigation }) => {
  const { totalSpend } = route.params; // Passed from the EndTripScreen
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("creditCard"); // Default payment method

  const handlePayment = async () => {
    setIsLoading(true);

    // Simulating a payment delay
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Payment Success", "Your payment has been successfully processed.");
      navigation.navigate("HomeScreen"); // Navigate to home or success screen
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#175E5E', height: 80, width: '100%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Total Amount Section */}
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4E4E90' }}>Total: {totalSpend} LKR</Text>
      </View>

      {/* Payment Method Section */}
      <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
        <Text style={{ fontSize: 18, color: '#175E5E', marginBottom: 10 }}>Choose Payment Method:</Text>

        {/* Credit Card Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("creditCard")}
          style={{
            backgroundColor: selectedMethod === "creditCard" ? "#E8F8A1" : "#F0F0F0",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="card-outline" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 10, fontSize: 18, color: "#175E5E" }}>Credit Card</Text>
        </TouchableOpacity>

        {/* PayPal Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("paypal")}
          style={{
            backgroundColor: selectedMethod === "paypal" ? "#E8F8A1" : "#F0F0F0",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="logo-paypal" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 10, fontSize: 18, color: "#175E5E" }}>PayPal</Text>
        </TouchableOpacity>

        {/* In-App Wallet Option */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("wallet")}
          style={{
            backgroundColor: selectedMethod === "wallet" ? "#E8F8A1" : "#F0F0F0",
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="wallet-outline" size={24} color="#175E5E" />
          <Text style={{ marginLeft: 10, fontSize: 18, color: "#175E5E" }}>In-App Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: "#175E5E",
          padding: 16,
          borderRadius: 50,
          marginHorizontal: 16,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: isLoading ? 0.5 : 1,
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
