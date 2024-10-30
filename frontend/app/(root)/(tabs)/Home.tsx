import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState, useCallback } from "react";
import { GetUserByEmail } from "@/services/appUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGet } from "@/models/appUser";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Ride } from "@/types/type";
import {
  CanceledRide,
  getRidesByUserEmail,
  IsRideWaiting,
  RatingRide,
} from "@/services/ride";
import { useUserData } from "@/hooks/useUserData";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import { useRidesData } from "@/hooks/useRidesData";

type Props = {};

const Home = (props: Props) => {
  const [user, setUser] = useState<UserGet>();
  const [email, setEmail] = useState<string>();
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState<Ride[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [isRideWaiting, setIsRideWaiting] = useState<boolean>();

  const fetchData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("@user_email");
      if (userEmail) {
        setEmail(userEmail);
        const data = await GetUserByEmail(userEmail);
        if (data) {
          setUser(data);
          const isWaitingRide = await IsRideWaiting(userEmail);
          setIsRideWaiting(isWaitingRide);
          console.log("isWaitingRide:",isWaitingRide);
        }

        const dataRides = await getRidesByUserEmail(userEmail);
        if (dataRides) setRides(dataRides);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setHasPermissions(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      address: `${address[0].name}, ${address[0].region}`,
    });
  };

  useEffect(() => {
    requestLocation();
    fetchData();
  }, []);

  const handleSignedOut = async () => {
    await AsyncStorage.removeItem("@user_email");
    router.push("/(auth)/Welcome");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/FindRide");
  };

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
      const isWaitingRide = await IsRideWaiting(email!);
      setIsRideWaiting(isWaitingRide);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData(); 
    await requestLocation();
    setRefreshing(false);
  }, []);

  const onRateDriver = async(rideId:number, rating:number) => {
    await RatingRide(rideId, rating);
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId
          ? { ...ride, rideRaiting:rating }
          : ride
      )
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-general-500">
        <FlatList
          data={rides.slice(0, 5)}
          renderItem={({ item }) => (
            <RideCard onCancel={cancelRide} ride={item} onRateDriver={onRateDriver} />
          )}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              {!loading || rides.length === 0 ? (
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
              ) : (
                <ActivityIndicator size={"small"} color="#000" />
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <View className="flex flex-row items-center justify-between my-5">
                <Text className="text-2xl font-JakartaExtraBold">
                  Welcome, {user?.username || email?.split("@")[0]} 👋
                </Text>
                <TouchableOpacity
                  onPress={handleSignedOut}
                  className="justify-center items-center w-10 h-10 rounded-full bg-white"
                >
                  <Image source={icons.out} className="w-4 h-4" />
                </TouchableOpacity>
              </View>
              {isRideWaiting === false && (
                <GoogleTextInput
                  icon={icons.search}
                  containerStyle="bg-white shadow-md shadow-neutral-300"
                  handlePress={handleDestinationPress}
                />
              )}

              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>

              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Recent Rides
              </Text>
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
