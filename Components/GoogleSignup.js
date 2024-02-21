import { View, Text, Button } from "react-native";
import React from "react";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

const GoogleComponent = () => {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "636281495496-6j0lsg9o1h54ujicsb3eame8gpohnbd8.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      permissions: ["public_profile", "email", "gender", "locations"],
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setUserInfo(userInfo);
      if (userInfo) {
        const { user, idToken, accessToken } = userInfo;
        //console.log(user);
      }

      setError();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setUserInfo();
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        alignItems: "center",
      }}
    >
      {userInfo && <Text>{JSON.stringify(userInfo)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
          //disabled={this.state.isSigninInProgress}
        />
      )}
    </View>
  );
};

export default GoogleComponent;
