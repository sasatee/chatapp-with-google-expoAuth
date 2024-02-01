import { View, Text } from "react-native";
import React from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext({
  //initial state
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: "sonny" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
