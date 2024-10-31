import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useUserStore } from "@/store";

import { getRidesByUserEmail, IsRideWaiting } from "@/services/ride";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import { useRides } from "@/hooks/useRides";

type Props = {};

const Home = (props: Props) => {
  const { user, setUser, handleSignedOut } = useUserStore();
  const { requestLocation, handleDestinationPress } = useLocationPermissions();
  const {
    rides,
    isRideWaiting,
    cancelRide,
    onRateDriver,
    setIsRideWaiting,
    setRides,
  } = useRides(user);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("@user_email");
      if (userEmail) {
        setUser(userEmail);
        const isWaitingRide = await IsRideWaiting(userEmail);
        setIsRideWaiting(isWaitingRide);
        const dataRides = await getRidesByUserEmail(userEmail);
        if (dataRides) {
          setRides(dataRides);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    requestLocation();
    fetchData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    await requestLocation();
    setRefreshing(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-general-500">
        <FlatList
          data={rides.slice(0, 5)}
          renderItem={({ item }) => (
            <RideCard
              onCancel={cancelRide}
              ride={item}
              onRateDriver={onRateDriver}
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
                  Welcome, {user?.username || "Guest"} 👋
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
