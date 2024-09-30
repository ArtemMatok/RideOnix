import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const Home = (props: Props) => {
  const [userEmail, setUserEmail] = useState<string | null>(null); // Використовуйте null для початкового стану
  const [isLoading, setIsLoading] = useState(true); // Стан завантаження

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("@user_email");
      console.log("Email index:", email);
      if (email) {
        setUserEmail(email);
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
      {userEmail ? (
        <Redirect href="/(root)/(tabs)/Home" />
      ) : (
        <Redirect href="/(auth)/Welcome" />
      )}
    </>
  );
};

export default Home;
