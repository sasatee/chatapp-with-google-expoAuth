import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth, { AuthProvider } from "./hooks/useAuth";

const Stack = createStackNavigator();

const App = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
