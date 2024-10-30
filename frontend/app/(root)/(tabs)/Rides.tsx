import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ride } from '@/types/type'
import { CanceledRide, getRidesByUserEmail } from '@/services/ride'
import RideCard from '@/components/RideCard'
import { images } from '@/constants'

type Props = {}

const Rides = (props: Props) => {
  const [email, setEmail] = useState<string>();
  const[rides,setRides] = useState<Ride[]>([]);
  const loading = true;
  useEffect(() => {

    const getEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("@user_email");

        if (userEmail) {
          setEmail(userEmail);
         

          const dataRides = await getRidesByUserEmail(userEmail);
          if(dataRides){
            setRides(dataRides);
          }
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
  return (
    <SafeAreaView>
      <FlatList
          data={rides }
          renderItem={({ item }) => <RideCard onCancel={cancelRide} ride={item} />}
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
             <Text className='text-2xl font-JakartaBold my-5'>All rides</Text>
            </>
          )}
        />
    </SafeAreaView>
  )
}

export default Rides