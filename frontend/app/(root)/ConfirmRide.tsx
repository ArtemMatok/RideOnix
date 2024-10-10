import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RideLayout from '@/components/RideLayout'
import DriverCard from '@/components/DriverCard'
import CustomButton from '@/components/CustomButton';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';

// const drivers = [
//   {
//     id: 1, // додано id
//     first_name: "James",
//     last_name: "Wilson",
//     title: "James Wilson", // додано title
//     profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
//     car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
//     car_seats: 4,
//     rating: 4.80,
//     latitude: 40.7128, // додано latitude
//     longitude: -74.0060, // додано longitude
//   },
//    {
//      id: 2, // додано id
//      first_name: "David",
//      last_name: "Brown",
//      title: "David Brown", // додано title
//      profile_image_url: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
//      car_image_url: "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
//      car_seats: 5,
//      rating: 4.60,
//      latitude: 34.0522, // додано latitude
//      longitude: -118.2437, // додано longitude
//   },
//    {
//      id: 3, // додано id
//      first_name: "Michael",
//      last_name: "Johnson",
//      title: "Michael Johnson", // додано title
//      profile_image_url: "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
//      car_image_url: "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
//      car_seats: 4,
//      rating: 4.70,
//      latitude: 51.5074, // додано latitude
//      longitude: -0.1278, // додано longitude
//    },
//    {
//      id: 4, // додано id
//      first_name: "Robert",
//      last_name: "Green",
//      title: "Robert Green", // додано title
//      profile_image_url: "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
//      car_image_url: "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
//      car_seats: 4,
//      rating: 4.90,
//      latitude: 48.8566, // додано latitude
//      longitude: 2.3522, // додано longitude
//    }
// ];


const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList 
        data={drivers} 
        renderItem={({item}) => (
          <DriverCard 
            selected={selectedDriver!} 
            setSelected={() => setSelectedDriver(Number(item.driverId)!)} 
            item={item} 
          />
        )}
        ListFooterComponent={() => (
          <View className='mx-5 mt-10'>
            <CustomButton title="Select Ride" onPress={() => router.push('/(root)/BookRide')} />
          </View>
        )}
      />
    </RideLayout>
  )
}

export default ConfirmRide