import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, images } from "@/constants";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useUserStore } from "@/store";

import { getRideByDriverEmail } from "@/services/ride";
import MapDriver from "@/components/MapDriver";
import RideCardDriver from "@/components/RideCardDriver";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import { useRides } from "@/hooks/useRides";

type Props = {};

const Home = (props: Props) => {
  const { user, setUser, handleSignedOut } = useUserStore();
  const { requestLocation } = useLocationPermissions();
  const {
    rides,
    cancelRide,
    setRides,
    onFinishRide,
    onStartRide,
    onAcceptRide,
  } = useRides(user);
  const [email, setEmail] = useState<string>();
  const loading = true;
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const driverEmail = await AsyncStorage.getItem("@user_email");
      if (driverEmail) {
        setUser(driverEmail);
        const dataRides = await getRideByDriverEmail(driverEmail);
        if (dataRides) {
          setRides(dataRides);
        }
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  useEffect(() => {
    fetchData();
    requestLocation();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-general-500">
        <FlatList
          data={rides.slice(0, 5)}
          renderItem={({ item }) => (
            <RideCardDriver
              ride={item}
              onCancel={cancelRide}
              onStartRide={onStartRide}
              onFinishRide={onFinishRide}
              onAccept={onAcceptRide}
            />
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
