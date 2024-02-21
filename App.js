import "expo-dev-client";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      {/* high order component : wrapping the children component within */}

      <AuthProvider>
        {/* passes down information to children */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
