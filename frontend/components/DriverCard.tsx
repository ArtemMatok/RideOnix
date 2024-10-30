import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";
import { GetDriverRating } from "@/services/driver";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  const [ratingDriver, setRatingDriver] = useState<number>();
  useEffect(() => {
    const getRating = async() => {
      const data = await GetDriverRating(item.email);
     if(data){
      setRatingDriver(data);
     }
    }
    getRating();
  },[])

  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.driverId ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <Image
        source={{ uri: item.profileImageUrl }}
        className="w-14 h-14 rounded-full"
      />

      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-lg font-JakartaRegular">{item.fullName}</Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text className="text-sm font-JakartaRegular">{ratingDriver}</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="text-sm font-JakartaRegular ml-1">
              ${item.price}
            </Text>
          </View>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800">
            {formatTime(parseInt(`${item.time!}`))}
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800">
            {item.carSeats} seats
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: item.carImage }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;