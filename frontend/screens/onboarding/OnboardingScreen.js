import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const OnboardingScreen = ({ navigation }) => {
  return (
    <Swiper loop={false} showsPagination={true} activeDotColor="#E9C46A">
      {/* Onboarding Slide 1 */}
      <View className="flex-1 justify-center items-center bg-[#175E5E]">
        <Image
          source={{ uri: 'https://example.com/feature1.png' }}  // Replace with an actual image
          className="w-72 h-72 mb-10"
          resizeMode="contain"
        />
        <Text className="text-4xl font-extrabold text-white mb-4">Welcome to OpenRide</Text>
        <Text className="text-lg text-white px-6 text-center">
          Enjoy seamless bike-sharing experience with real-time GPS tracking.
        </Text>
      </View>

      {/* Onboarding Slide 2 */}
      <View className="flex-1 justify-center items-center bg-[#175E5E]">
        <Image
          source={{ uri: 'https://example.com/feature2.png' }}  // Replace with an actual image
          className="w-72 h-72 mb-10"
          resizeMode="contain"
        />
        <Text className="text-4xl font-extrabold text-white mb-4">Flexible Rentals</Text>
        <Text className="text-lg text-white px-6 text-center">
          Unlock bikes with a QR code and enjoy flexible rentals anytime, anywhere.
        </Text>
      </View>

      {/* Onboarding Slide 3 */}
      <View className="flex-1 justify-center items-center bg-[#175E5E]">
        <Image
          source={{ uri: 'https://example.com/feature3.png' }}  // Replace with an actual image
          className="w-72 h-72 mb-10"
          resizeMode="contain"
        />
        <Text className="text-4xl font-extrabold text-white mb-4">Join the Community</Text>
        <Text className="text-lg text-white px-6 text-center mb-8">
          Become a bike owner and earn by sharing your bike with the community.
        </Text>
        {/* Get Started Button */}
        <TouchableOpacity
          className="bg-[#E9C46A] rounded-full p-4 w-64"
          onPress={() => navigation.replace("Login")}
        >
          <Text className="text-center text-[#175E5E] font-bold text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

export default OnboardingScreen;
