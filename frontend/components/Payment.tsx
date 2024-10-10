import { Alert, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { ConfirmPayment, CreatePaymentSheet } from "@/services/payment";
import { router } from "expo-router";

interface Props {
  userName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

const Payment = ({ userName, email, amount, driverId, rideTime }: Props) => {

  const openPaymentSheet = () => {
    
  }
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
