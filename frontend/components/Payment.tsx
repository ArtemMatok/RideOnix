import { Alert, Button, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { ConfirmPayment, CreatePaymentSheet } from "@/services/payment";
import { router } from "expo-router";
import { addRide, RideRequest } from "@/services/ride";
import { CreateRide } from "./CreateRide";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";

interface Props {
  userName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

const Payment = ({ userName, email, amount, driverId, rideTime }: Props) => {
  const [success, setSuccess] = useState(false);
  const createRide = async (request: RideRequest) => {
    try {
      await addRide(request);
      setSuccess(true);
      // returnURL: 'myapp"//book-ride';
    } catch (error) {
      Alert.alert("Помилка", "Щось пішло не так під час додавання поїздки.");
    }
  }

  const openPaymentSheet =  () => {

  }

  return (
    <>
      {/* <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      /> */}
      
      
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
            Thank you for your booking. Your reservation has been placed. Please proceed with your trip!
          </Text>

          <CustomButton title="Back Home" onPress={() => {
            setSuccess(false)
            router.push('/(root)/(tabs)/Home')
          }}
            className="mt-5"

          >

          </CustomButton>
          
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;


