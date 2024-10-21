import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { Ride } from "@/types/type";
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from "@/constants/urlApi";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/formateDate";

type Props = {
  ride: Ride;
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
    paymentStatus,
  },
}: Props) => {

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

        <View className="flex flex-col w0full mt-5 bg-general rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">
             Date & Time
            </Text>

            <Text className="text-md font-JakartaMedium">
              {formatDate(String(createdAt))}, {formatTime(rideTime)}
            </Text>
          </View>
          
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">
             Driver
            </Text>

            <Text className="text-md font-JakartaMedium">
              {driver.firstName} {driver.lastName}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium">
             Car Seats
            </Text>

            <Text className="text-md font-JakartaMedium">
              {driver.carSeats}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
             Payment
            </Text>

            <Text className={`text-md capitalize font-JakartaMedium text-gray-500 ${paymentStatus === "Paid" ? "text-green-500": "text-red-500"}`}>
              {paymentStatus}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
