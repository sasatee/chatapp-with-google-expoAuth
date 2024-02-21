import React from "react";
import { createContext, useContext } from "react";

//google package and firebase

import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import { auth } from "../firebase";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState, useMemo } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "636281495496-6j0lsg9o1h54ujicsb3eame8gpohnbd8.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      permissions: ["public_profile", "email", "gender", "locations"],
    });
  }, []);
  // firebase verify user in logged in state

  useEffect(
    //onAuthStateChanged is a firebase function that will verify user in logged in state and set the user state to the user object if the user is logged in. If the user is not logged in, the user state will be set to null. The setLoadingInitial state is set to false to indicate that the loadingInitial
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //logged in
          setUser(user);
        } else {
          // not logged in
          setUser(null);
        }
        setLoadingInitial(false);
      }),

    []
  );

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        const { idToken } = userInfo;
        const userId = userInfo.user.id;
        const userEmail = userInfo.user.email;

        const credential = GoogleAuthProvider.credential(
          idToken,
          userId,
          userEmail
        );
        await signInWithCredential(auth, credential);

        //console.log(idToken);
      }
      return Promise.reject();
    } catch (error) {
      () => setError(error);
    } finally {
      () => setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      //firebase function sign out
      signOut(auth)
        .catch((error) => setError(error))
        .finally(() => setLoading(false));

      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const useMemoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  return (
    // user:user onAuthStateChanged
    <AuthContext.Provider value={useMemoValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
