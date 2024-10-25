import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGet } from "@/models/appUser";
import { GetUserByEmail } from "@/services/appUser";
import { isDriverExist } from "@/services/driver";

type Props = {};

const Home = (props: Props) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<UserGet>();
  const [isUser, setIsUser] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("@user_email");
      console.log("Email index:", email);
      if (email) {
        setUserEmail(email);
        const user = await GetUserByEmail(email);
        if (user) {
          setUser(user);
          //TODO: ПЕРЕВІРКА НА ДРАЙВЕРА
          const isDriver = await isDriverExist(email);
          if(isDriver){
            setIsUser(false);
          }else{
            setIsUser(true);
          }
        }
      }
      setIsLoading(false); // Закінчення завантаження
    };
    getEmail();
  }, []);

  // Показуємо завантаження, поки очікуємо результат
  if (isLoading) {
    return (
      <SafeAreaView className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#0286ff" className="mt-6" />
      </SafeAreaView>
    );
  }

  // Після того, як завантаження завершене, робимо редирект
  return (
    <>
      {user ? (
        isUser ? (
          <Redirect href="/(root)/(tabs)/Home" />
        ) : (
          <Redirect href="/(driver)/(tabs)/HomeDriver" />
        )
      ) : (
        <Redirect href="/(auth)/Welcome" />
      )}
    </>
  );
};

export default Home;
