import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  ViewBase,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
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
import { router, useNavigation } from "expo-router";
import { Ride } from "@/types/type";
import {
  AcceptingRide,
  CanceledRide,
  FinishRide,
  getRideByDriverEmail,
  getRidesByUserEmail,
  StartRide,
} from "@/services/ride";
import MapDriver from "@/components/MapDriver";
import RideCardDriver from "@/components/RideCardDriver";

type Props = {};

const Home = (props: Props) => {
  const [user, setUser] = useState<UserGet>();
  const [email, setEmail] = useState<string>();

  const [hasPermissions, setHasPermissions] = useState(false);
  const loading = true;
  const [rides, setRides] = useState<Ride[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingForMethod, setLoading] = useState(false);
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const fetchData = async () => {
    try {
      const driverEmail = await AsyncStorage.getItem("@user_email");

      if (driverEmail) {
        console.log("driverEmail:", driverEmail);
        setEmail(driverEmail);
        const data = await GetUserByEmail(driverEmail);

        if (data) {
          setUser(data);
        }

        const dataRides = await getRideByDriverEmail(driverEmail);
        if (dataRides) {
          setRides(dataRides);
        }
      }

      const requestLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setHasPermissions(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync();

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords?.latitude!,
          longitude: location.coords?.longitude,
        });

        setUserLocation({
          latitude: location.coords?.latitude!,
          longitude: location.coords?.longitude,
          address: `${address[0].name}, ${address[0].region}`,
        });
      };

      requestLocation();
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignedOut = async () => {
    await AsyncStorage.removeItem("@user_email");
    router.push("/(auth)/Welcome");
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
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
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
    setLoading(true); // Показуємо індикатор завантаження
   await StartRide(rideId);
  
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId ? { ...ride, rideStatus: "Started" } : ride
        )
      );

    setLoading(false); // Приховуємо індикатор завантаження
  };
  
  const onFinishRide = async (rideId: number) => {
    setLoading(true);
     await FinishRide(rideId);

      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId ? { ...ride, rideStatus: "Finished" } : ride
        )
      );
    
    setLoading(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-general-500">
        <FlatList
          data={rides.slice(0, 5)}
          renderItem={({ item }) => (
            <RideCardDriver ride={item} onCancel={cancelRide} onStartRide={onStartRide} onFinishRide={onFinishRide} onAccept={onAcceptRide}/>
          )}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              {!loading || rides.length == 0 ? (
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
              <View className="flex flex-row items-center justify-between my-5">
                <Text className="text-2xl font-JakartaExtraBold">
                  Welcome, {user?.username || email?.split("@"[0])} 👋
                </Text>
                <TouchableOpacity
                  onPress={handleSignedOut}
                  className="justify-center  items-center w-10 h-10 rounded-full bg-white"
                >
                  <Image source={icons.out} className="w-4 h-4" />
                </TouchableOpacity>
              </View>

              <>
                <Text className="text-xl font-JakartaBold mt-5 mb-3">
                  Your Current Location
                </Text>
                <View className="flex flex-row items-center bg-transparent h-[300px]">
                  <MapDriver />
                </View>
              </>

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
