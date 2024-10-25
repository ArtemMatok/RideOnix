import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { UserGet } from "@/models/appUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserByEmail } from "@/services/appUser";
import InputField from "@/components/InputField";


type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = useState<UserGet>();




  useEffect(() => {
    const userGetByEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("@user_email");

        if (userEmail) {
          const data = await GetUserByEmail(userEmail);

          if (data) {
            setUser(data);
          }

        }
      }catch(error){
        console.log(error);
      }
    }
    userGetByEmail();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>


        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Name"
              placeholder={user?.username || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />


            <InputField
              label="Email"
              placeholder={
               user?.email
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
