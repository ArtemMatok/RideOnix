import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserByEmail } from "@/services/appUser";
import { UserGet } from "@/models/appUser";

export const useUserData = () => {
  const [user, setUser] = useState<UserGet>();
  const [email, setEmail] = useState<string>();

  const fetchUserData = async () => {
    const userEmail = await AsyncStorage.getItem("@user_email");
    if (userEmail) {
      setEmail(userEmail);
      const data = await GetUserByEmail(userEmail);
      if (data) setUser(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, email, fetchUserData };
};
