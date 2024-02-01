import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Dada</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
