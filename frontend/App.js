import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { registerRootComponent } from "expo";

NativeWindStyleSheet.setOutput({
  default: "native",
});

function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

// Register the App component with AppRegistry
registerRootComponent(App);

export default App;
