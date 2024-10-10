import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index
  const swiperRef = useRef(null); // Reference to the Swiper component

  const handleNext = () => {
    if (swiperRef.current && currentIndex < 2) {
      swiperRef.current.scrollBy(1); // Move to the next slide
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}  // Attach ref to the Swiper
        loop={false}
        showsPagination={true}
        activeDotColor="#175E5E"  // Use the new color
        onIndexChanged={(index) => setCurrentIndex(index)}  // Track the slide change
      >
        {/* Onboarding Slide 1 */}
        <View style={styles.slide}>
          <Image
            source={require("../../assets/on1.png")} // First onboarding image
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Locate</Text>
            <Text style={styles.text}>Locate an electric or mechanic bike near you</Text>
          </View>
        </View>

        {/* Onboarding Slide 2 */}
        <View style={styles.slide}>
          <Image
            source={require("../../assets/on2.png")} // Second onboarding image
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Unlock</Text>
            <Text style={styles.text}>Use our trusted methods to easily access a ride</Text>
          </View>
        </View>

        {/* Onboarding Slide 3 */}
        <View style={styles.slide}>
          <Image
            source={require("../../assets/on3.png")} // Third onboarding image
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Ride</Text>
            <Text style={styles.text}>Get to your destination without any hassle</Text>
          </View>
        </View>
      </Swiper>

      {/* Get Started Button (only on third slide, aligned above the pagination) */}
      {currentIndex === 2 && (
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      )}

      {/* Skip and Next Buttons for slides 1 and 2 */}
      {currentIndex < 2 && (
        <View style={styles.bottomRow}>
          {/* Skip Button */}
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          {/* Next Button */}
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,  // Full width of the screen
    height: height * 0.6,  // Covers 60% of the screen height
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: height * 0.7,  // Push content below the image
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#175E5E",  // Updated to the new color
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  getStartedButton: {
    position: "absolute",  // Place it above the Swiper's pagination
    bottom: 70,  // Position it just above the pagination dots
    left: "25%",
    right: "25%",
    paddingVertical: 12,
    backgroundColor: "#175E5E",  // Updated to the new color
    borderRadius: 25,
    alignItems: "center",
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  skip: {
    fontSize: 16,
    color: "#999",
  },
  next: {
    fontSize: 16,
    color: "#175E5E",  // Updated to the new color
    fontWeight: "bold",
  },
};

export default OnboardingScreen;
