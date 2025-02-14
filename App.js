import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <NavigationContainer>
      {/* Hide Status Bar */}
      <StatusBar hidden={false} />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
