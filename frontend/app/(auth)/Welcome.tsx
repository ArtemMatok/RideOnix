import { View, Text, Image } from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

type Props = {};

const OnBoarding = (props: Props) => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <GestureHandlerRootView className="flex h-full items-center justify-between bg-white">
      <SafeAreaView className="w-full flex justify-end items-end px-6">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/SignUp");
          }}
        >
          <Text className="text-black text-md font-JakartaBold">Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 justify-center">
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full " />
          }
          activeDot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View
              className="flex items-center justify-center px-5"
              key={item.id}
            >
              <Image
                source={item.image}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="flex flex-row items-center justify-center w-full mt-8">
                <Text className=" text-black text-3xl font-bold mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>

        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          className="w-11/12 mt-10"
          onPress={() => isLastSlide ? router.replace("/(auth)/SignUp") : swiperRef.current?.scrollBy(1)}
        />
      </View>

      {/* Add some space below the swiper to move the dots up */}
      <View className="mb-10" />
    </GestureHandlerRootView>
  );
};

export default OnBoarding;
