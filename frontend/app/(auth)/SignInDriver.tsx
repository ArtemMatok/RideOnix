import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { loginValidation } from "@/lib/loginValidation";
import { LoginUser } from "@/services/appUser";
import ReactNativeModal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const SignInDriver = (props: Props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (form) {
      if (loginValidation(form)) {
        setIsLoading(true);
        const login = async () => {
          const data = await LoginUser(form);
          if (data) {
            await AsyncStorage.setItem("@user_email", data.email);
            const email =   await AsyncStorage.getItem("@user_email");
            console.log(email);


            setIsLoading(false);
            setIsSuccess(true);
          } else {
            setIsLoading(false);
          }
        };

        login();
      }
    }
  };

  const handlePage = () => {
    setIsSuccess(false);
    router.push("/(driver)/(tabs)/HomeDriver");
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full f-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
              Welcome, Driver 👋
            </Text>
          </View>

          <View className="p-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={true}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#0286ff"
                className="mt-6"
              />
            ) : (
              <CustomButton
                title="Sign In"
                onPress={onSignInPress}
                className="mt-6"
              />
            )}

            <Link
              href="/SignUpDriver"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Don`t have an account? </Text>
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>

          {/* {Verification Modal} */}

          <ReactNativeModal isVisible={isSuccess}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />

              <Text className="text-2xl font-JakartaBold text-center">
                Success
              </Text>

              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                You have successfully log in your account
              </Text>

              <CustomButton
                className="mt-5"
                title="Browse Home"
                onPress={() => handlePage()}
              />
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SignInDriver;
