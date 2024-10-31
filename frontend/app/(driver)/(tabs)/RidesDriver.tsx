import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ride } from "@/types/type";
import {
  AcceptingRide,
  CanceledRide,
  FinishRide,
  getRideByDriverEmail,
  getRidesByUserEmail,
  RatingRide,
  StartRide,
} from "@/services/ride";
import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import RideCardDriver from "@/components/RideCardDriver";
import { useUserStore } from "@/store";

type Props = {};

const Rides = (props: Props) => {
  const { user } = useUserStore();

  const [rides, setRides] = useState<Ride[]>([]);
  const loading = true;
  useEffect(() => {
    const getEmail = async () => {
      try {
        const dataRides = await getRideByDriverEmail(user.email);
        if (dataRides) {
          setRides(dataRides);
        }
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    getEmail();
  }, []);

  const cancelRide = async (rideId: number) => {
    const result = await CanceledRide(rideId);
    if (result) {
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId
            ? { ...ride, rideStatus: "Canceled", paymentStatus: "Canceled" }
            : ride
        )
      );
    }
  };

  const onStartRide = async (rideId: number) => {
    await StartRide(rideId);

    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId ? { ...ride, rideStatus: "Started" } : ride
      )
    );
  };

  const onFinishRide = async (rideId: number) => {
    await FinishRide(rideId);

    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId ? { ...ride, rideStatus: "Finished" } : ride
      )
    );
  };

  const onAcceptRide = async (rideId: number) => {
    const result = await AcceptingRide(rideId);
    if (result) {
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId
            ? {
                ...ride,
                rideStatus: "Accepted",
                paymentStatus: "Waiting for payment",
              }
            : ride
        )
      );
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={rides}
        renderItem={({ item }) => (
          <RideCardDriver
            onCancel={cancelRide}
            ride={item}
            onAccept={onAcceptRide}
            onFinishRide={onFinishRide}
            onStartRide={onStartRide}
          />
        )}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading || rides.length === 0 ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
              </>
            ) : (
              <ActivityIndicator size={"small"} color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Text className="text-2xl font-JakartaBold my-5">All rides</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
