import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Image,
    ActivityIndicator,
    ViewBase,
  } from "react-native";
  import * as Location from "expo-location";
  import React, { useEffect, useState } from "react";
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
  import { getRideByDriverEmail, getRidesByUserEmail } from "@/services/ride";
import MapDriver from "@/components/MapDriver";
  
  type Props = {};
  
  
  
  const Home = (props: Props) => {
    const [user, setUser] = useState<UserGet>();
    const [email, setEmail] = useState<string>();
   
    const [hasPermissions, setHasPermissions] = useState(false);
    const loading = true;
    const[rides,setRides] = useState<Ride[]>([]);
  
  
    const { setUserLocation, setDestinationLocation } = useLocationStore();
  
  
    useEffect(() => {
  
      const userGetByEmail = async () => {
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
            if(dataRides){
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
  
  
      userGetByEmail();
   
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
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="bg-general-500">
          <FlatList
            data={rides.slice(0,5) }
            renderItem={({ item }) => <RideCard ride={item} />}
            
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
  
                <GoogleTextInput
                  icon={icons.search}
                  containerStyle="bg-white shadow-md shadow-neutral-300"
                  handlePress={handleDestinationPress}
                />
  
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
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  };
  
  export default Home;
  