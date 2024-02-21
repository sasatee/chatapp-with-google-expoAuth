import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerShown: false,
    // });
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{
          uri: "https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_hero-1.jpg",
        }}
      >
        <TouchableHighlight
          underlayColor="#f0f4f3"
          className="absolute bottom-16 w-52 bg-white p-4 rounded-2xl"
          style={{ marginHorizontal: "25%" }}
          onPress={signInWithGoogle}
        >
          <Text className="text-center font-semibold">Sign In With Google</Text>
        </TouchableHighlight>
      </ImageBackground>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      /> */}
    </View>
  );
};

export default LoginScreen;
