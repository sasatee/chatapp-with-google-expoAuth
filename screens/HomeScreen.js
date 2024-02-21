import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Fontisto, AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
  onSnapshot,
  doc,
  db,
  collection,
  getFirestore,
} from "firebase/firestore";

const DUMMY_DATA = [
  {
    firstName: "Sarvam",
    lastName: "Seetohul",
    occupational: "Software Developper",
    photoURL:
      "https://th.bing.com/th/id/OIP.xKRmOdG9ocAWsLbdLlvr8AHaHa?rs=1&pid=ImgDetMain",
    age: 27,
    id: 123,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    occupational: "CEO",
    photoURL:
      "https://th.bing.com/th/id/OIP.O4Lrw3QH_SZeKwid1-Ha7QHaK3?rs=1&pid=ImgDetMain",
    age: 40,
    id: 456,
  },
  {
    firstName: "Marcus",
    lastName: "Rashford",
    occupational: "Footballer",
    photoURL:
      "https://th.bing.com/th/id/OIP.93mckLhQkP8n_-66Li3VLAHaFj?rs=1&pid=ImgDetMain",
    age: 24,
    id: 789,
  },
];

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  const db = getFirestore();

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsubs;
    const fetchData = async () => {
      unsubs = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            //.filter((doc) => doc.id !== user.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };
    fetchData();
    return unsubs;
  }, []);

  const swipeLeft = (cardIndex) => {};
  const swipeRight = (cardIndex) => {};
  return (
    <SafeAreaView className="">
      {/* Header */}

      <View className="flex-row items-center justify-between px-10 top-9">
        <Pressable onPress={logout}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Modal");
          }}
        >
          <Fontisto name="tinder" size={40} color="red" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={35} color="red" />
        </Pressable>
      </View>

      {/* End of header */}

      {/* Cards */}
      <View className="flex-1 -mt-2">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("SWIPE PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("SWIPE MATCH");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
                <Image
                  source={{ uri: card.photoURL }}
                  className="absolute top-0 h-full w-full rounded-xl"
                />
                <View
                  className="absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center  px-6 py-2 rounded-b-xl"
                  style={styles.cardShadow}
                >
                  <View>
                    <Text className="text-xl font-bold">
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-2xl font-bold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                className="relative bg-white h-3/4 rounded-xl justify-center items-center "
                style={styles.cardShadow}
              >
                <Text className="font-bold pb-5">No More Profile</Text>
                <Image
                  source={{ uri: "https://links.papareact.com/6gb" }}
                  className="h-20 w-full"
                  heigth={100}
                  width={100}
                />
              </View>
            )
          }
        />
      </View>
      <View className="flex flex-row justify-evenly top-96 ">
        <Pressable
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={30} color="green" />
        </Pressable>

        <Pressable
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={30} color="red" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default HomeScreen;
