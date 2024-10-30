import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ride } from "@/types/type";
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from "@/constants/urlApi";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/formateDate";
import { router } from "expo-router";
import { StartRide } from "@/services/ride";

type Props = {
  ride: Ride;
  onCancel: (rideId: number) => void;
  onStartRide: (rideId: number) => void;
  onFinishRide: (rideId: number) => void;
  onAccept: (rideId: number) => void;
};

const RideCard = ({
  ride: {
    rideId,
    destinationLongitude,
    destinationLatitude,
    originAddress,
    destinationAddress,
    createdAt,
    rideTime,
    driver,
    rideStatus,
    paymentStatus,
    rideRaiting,
  },
  onCancel,
  onStartRide,
  onFinishRide,
  onAccept,
}: Props) => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [rating, setRating] = useState(rideRaiting || 0);

  const confirmCancel = () => {
    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this ride?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => onCancel(rideId),
          style: "destructive",
        },
      ]
    );
  };

  const onPayment = () => {
    router.push(`/(root)/PaymentChoose/${rideId}`);
  };

  const onStartClick = () => {
    onStartRide(rideId);
  };

  const onFinishClick = () => {
    onFinishRide(rideId);
  };

  const confirmAccept = () => {
    onAccept(rideId);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text
        style={{ fontSize: 24, color: index < rating ? "#FFD700" : "#C0C0C0" }}
        key={index}
      >
        ★
      </Text>
    ));
  };

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destinationLongitude},${destinationLatitude}&zoom=14&apiKey=${EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {originAddress}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {destinationAddress}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">Date & Time</Text>
            <Text className="text-md font-JakartaMedium">
              {formatDate(String(createdAt))}, {formatTime(rideTime)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">Driver</Text>
            <Text className="text-md font-JakartaMedium">
              {driver.fullName}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">Car Seats</Text>
            <Text className="text-md font-JakartaMedium">
              {driver.carSeats}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment
            </Text>
            <Text
              className={`text-md capitalize font-JakartaMedium ${
                paymentStatus === "Paid"
                  ? "text-green-500"
                  : paymentStatus === "Waiting accepting"
                  ? "text-yellow-500"
                  : paymentStatus === "Canceled"
                  ? "text-red-500"
                  : paymentStatus === "Waiting for payment"
                  ? "text-yellow-600"
                  : paymentStatus === "Paid by cash"
                  ? "text-green-500"
                  : paymentStatus === "Paid by card"
                  ? "text-green-500"
                  : "text-grey"
              }`}
            >
              {paymentStatus}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Ride status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaMedium ${
                rideStatus === "Finished"
                  ? "text-green-500"
                  : rideStatus === "Canceled"
                  ? "text-red-500"
                  : rideStatus === "Accepted"
                  ? "text-green-700"
                  : rideStatus.includes("Waiting")
                  ? "text-yellow-500"
                  : rideStatus === "Started"
                  ? "text-green-500"
                  : rideStatus === "Finished"
                  ? "text-green-500"
                  : "text-grey"
              }`}
            >
              {rideStatus}
            </Text>
          </View>

          {/* Кнопка скасування замовлення */}
          {rideStatus === "Waiting accepting" && (
            <TouchableOpacity
              onPress={confirmAccept}
              className="bg-green-500 w-full py-2 rounded-lg items-center mt-3"
            >
              <Text className="text-white font-JakartaMedium">Accept</Text>
            </TouchableOpacity>
          )}
          {rideStatus === "Waiting accepting" && (
            <TouchableOpacity
              onPress={confirmCancel}
              className="bg-red-500 w-full py-2 rounded-lg items-center mt-3"
            >
              <Text className="text-white font-JakartaMedium">Cancel</Text>
            </TouchableOpacity>
          )}

          {/* Нова кнопка "Start" */}

          {rideStatus === "Waiting for start" && (
            <TouchableOpacity
              onPress={onStartClick}
              className="bg-green-500 w-full py-2 rounded-lg items-center mt-3"
            >
              <Text className="text-white font-JakartaMedium">Start</Text>
            </TouchableOpacity>
          )}

          {rideStatus === "Started" && (
            <TouchableOpacity
              onPress={onFinishClick}
              className="bg-red-500 w-full py-2 rounded-lg items-center mt-3"
            >
              <Text className="text-white font-JakartaMedium">Finish</Text>
            </TouchableOpacity>
          )}

          {rideStatus === "Finished" && (
            <View className="w-full items-center mt-3">
              <Text className="text-md font-JakartaMedium mb-2">
                {rideRaiting ? "Your Rating" : "Rate Driver"}
              </Text>
              <View className="flex flex-row mb-3">{renderStars()}</View>
          
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default RideCard;
