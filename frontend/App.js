import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { registerRootComponent } from "expo";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

NativeWindStyleSheet.setOutput({
  default: "native",
});

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state for splash screen
  const [firstLaunch, setFirstLaunch] = useState(null); // Track if it's the first time launching the app

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
        if (alreadyLaunched === null) {
          // First time launching the app
          await AsyncStorage.setItem("alreadyLaunched", "true");
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking first launch", error);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync(); // Hide the splash screen after checking
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return null; // Render nothing while splash screen is active
  }

  return (
    <NavigationContainer>
      {firstLaunch ? <OnboardingScreen /> : <MainNavigator />}
    </NavigationContainer>
  );
}

// Register the App component with AppRegistry
registerRootComponent(App);

export default App;
