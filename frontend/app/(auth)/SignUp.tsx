import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { RegisterDto } from "@/models/appUser";
import ReactNativeModal from "react-native-modal";
import { registerValidation } from "@/lib/registerValidation";
import { RegisterUser } from "@/services/appUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const SignUp = (props: Props) => {
  const [form, setForm] = useState<RegisterDto>({
    userName: "",
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignUpPress = () => {
    if (form) {
      if (registerValidation(form)) {
        setIsLoading(true);
        const register = async () => {
          const data = await RegisterUser(form);
          if (data) {
            await AsyncStorage.setItem("@user_email", data.email);
            const email = await AsyncStorage.getItem("@user_email");
            console.log(email);

            setIsLoading(false);
            setIsSuccess(true);
          } else {
            setIsLoading(false);
          }
        };
        register();
      }
    }
  };

  const handlePage = () => {
    setIsSuccess(false);
    router.push("/(root)/(tabs)/Home");
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full f-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
              Create Your Account
            </Text>
          </View>

          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={form.userName}
              onChangeText={(value) => setForm({ ...form, userName: value })}
            />
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
                title="Sign Up"
                onPress={onSignUpPress}
                className="mt-6"
              />
            )}

            <Link
              href="/SignIn"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Log In</Text>
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
                You have successfully created your account
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

export default SignUp;
