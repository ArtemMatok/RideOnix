import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { router, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";

type Props = {};

const SelectRegister = (props: Props) => {
    const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"Driver" | "User" | null>("User");
    

  const handleSelectRole = (role: "Driver" | "User") => {
    setSelectedRole(role);
  };

  const handleProceed = () => {
    if(selectedRole){
        if(selectedRole === "User"){
            router.push("/(auth)/SignUp");
        }
        else{
            router.push("/(auth)/SignUpDriver");
        }
    }
  };

  return (
    <GestureHandlerRootView className="flex h-full items-center justify-between bg-white">


      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-JakartaBold text-center text-black mb-6">
          Who are you?
        </Text>

        {/* User Selection */}
        <TouchableOpacity
          className={`w-11/12 py-4 rounded-xl border-2 ${
            selectedRole === "User" ? "border-primary-500" : "border-gray-300"
          } flex-row items-center justify-between px-4 mb-4`}
          onPress={() => handleSelectRole("User")}
        >
          <View className="flex-row items-center">
            <Image
              source={icons.person} // Use an appropriate icon
              className="w-[40px] h-[40px] mr-4"
              resizeMode="contain"
            />
            <Text className="text-xl text-black font-JakartaSemiBold">User</Text>
          </View>
          {selectedRole === "User" && (
            <Image source={images.check} className="w-6 h-6" />
          )}
        </TouchableOpacity>

        {/* Driver Selection */}
        <TouchableOpacity
          className={`w-11/12 py-4 rounded-xl border-2 ${
            selectedRole === "Driver" ? "border-primary-500" : "border-gray-300"
          } flex-row items-center justify-between px-4`}
          onPress={() => handleSelectRole("Driver")}
        >
          <View className="flex-row items-center">
            <Image
              source={icons.marker} // Use an appropriate icon
              className="w-[40px] h-[40px] mr-4"
              resizeMode="contain"
            />
            <Text className="text-xl text-black font-JakartaSemiBold">Driver</Text>
          </View>
          {selectedRole === "Driver" && (
            <Image source={images.check} className="w-6 h-6" />
          )}
        </TouchableOpacity>

        <CustomButton
          title="Continue"
          className="my-3"
          onPress={handleProceed}
        />
      </View>

      <View className="mb-10" />
    </GestureHandlerRootView>
  );
};

export default SelectRegister;
