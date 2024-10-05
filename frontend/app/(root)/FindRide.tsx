import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import { useScrollableSetter } from "@gorhom/bottom-sheet";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

type Props = {};

const FindRide = (props: Props) => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  useEffect(() => {
    console.log("userLocation:", userAddress);
  }, []);

  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/ConfirmRide")}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
