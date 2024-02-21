import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();

  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const navigation = useNavigation();

  const inCompleteForm = !image || !job || !age;
  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full "
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text className="text-xl text-gray-500 font-bold">
        Welcome {user.displayName}
      </Text>
      <Text className="text-center p-4 font-bold text-red-400">
        Step 1 : The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        placeholder="Enter a Profile Pic Url "
        className="text-center text-xl pb-2"
      />
      <Text className="text-center p-4 font-bold text-red-400">
        Step 2 : The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        placeholder="Enter your Occupation"
        className="text-center text-xl pb-2"
      />
      <Text className="text-center p-4 font-bold text-red-400">
        Step 2 : The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
        className="text-center text-xl pb-2"
      />
      <TouchableOpacity
        className={`w-64 p-3 rounded-xl absolute bottom-10 ${
          inCompleteForm ? "bg-gray-400" : "bg-red-500"
        }`}
        disabled={inCompleteForm}
        onPress={updateUserProfile}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
