import { Alert, Button, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import {
  PaymentSheetError,
  StripeProvider,
  useStripe,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { addRide, RideRequest } from "@/services/ride";
import { CreateRide } from "./CreateRide";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { PaymentMethod } from "@/types/type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CheckoutScreen from "./CheckOutScreen";

interface Props {
  userName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
  paymentMethod: PaymentMethod;
}

const Payment = ({
  userName,
  email,
  amount,
  driverId,
  rideTime,
  paymentMethod,
}: Props) => {
  const [success, setSuccess] = useState(false);
  const createRide = async (request: RideRequest) => {
    console.log(paymentMethod);
    try {
      const data = await addRide(request);
      if (data) {
        setSuccess(true);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong during adding ride");
    }
  };



  return (
    <>
      <CreateRide
        handleCreateRide={createRide}
        amount={amount}
        driverId={driverId}
        email={email}
        rideTime={rideTime}
      />
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Ride booked!
          </Text>

          <Text className="text-md text-general-200 font-JakartaMedium text-center mt-3">
            Thank you for your booking. Your reservation has been placed.
            Please, wait when driver accept yout ride
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/Home");
            }}
            className="mt-5"
          ></CustomButton>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
