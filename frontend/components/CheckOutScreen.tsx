import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";
import { paymentSheet } from "@/services/payment";
import { router } from "expo-router";
import { useLocationStore } from "@/store";
import { addRide } from "@/services/ride";

type Props = {
  name: string;
  email: string;
  amount: number;
  driverId: number;
  rideTime: number;
};

export default function CheckoutScreen({ name, email, amount,rideTime, driverId }: Props) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const {
    userAddress,
    userLongitude, 
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude
  } = useLocationStore();

  const request = {
    originAddress: userAddress!,
    destinationAddress: destinationAddress!.toString(),
    originLatitude: userLatitude!.toString(),
    originLongitude: userLongitude!.toString(),
    destinationLatitude: destinationLatitude!.toString(),
    destinationLongitude: destinationLongitude!.toString(),
    rideTime: rideTime,
    farePrice: amount.toString(),  
    paymentStatus: "Paid",
    userEmail: email,
    driverId: driverId,
  };

  const fetchPaymentSheetParams = async () => {

    const data = await paymentSheet({
      name: name,
      email: email,
      amount: amount,
    });

    return {
     data
    };
  };

  const initializePaymentSheet = async () => {
    const { data } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: data?.customer,
      customerEphemeralKeySecret: data?.ephemeralKey,
      paymentIntentClientSecret: data?.paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: name,
      },
       returnURL: 'myapp://Home'
    });
    if (!error) {
      setLoading(true);
    }
  };

  const onPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
      try {
        await addRide(request);
        setSuccess(true);
      } catch (error) {
        Alert.alert("Error", "Something went wrong during adding ride");
      }
      router.push("/(root)/(tabs)/Home");
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={onPaymentSheet}
      ></CustomButton>
    </>
  );
}
