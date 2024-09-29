import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { GetUserByEmail } from "@/services/appUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGet } from "@/models/appUser";

type Props = {};

const Home = (props: Props) => {
  const [user, setUser] = useState<UserGet>();

  useEffect(() => {
    const userGetByEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("@user_email");
        console.log("EMAIL:", userEmail);

        if (userEmail) {
          const data = await GetUserByEmail(userEmail);
          console.log("data:", data); 
          if (data) {
            setUser(data);
          }
        }
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };
    userGetByEmail();
  }, []);
  return (
    <SafeAreaView className="flex items-center justify-center">
      <Text className="text-2xl">Hello, {user?.username}</Text>
    </SafeAreaView>
  );
};

export default Home;
