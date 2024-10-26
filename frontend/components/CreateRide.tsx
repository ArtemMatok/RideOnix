import { RideRequest } from "@/services/ride";
import { useLocationStore } from "@/store";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

interface Props {
  handleCreateRide: (request: RideRequest) => void;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

export const CreateRide = ({ 
  handleCreateRide,
    email, 
    amount, 
    driverId, 
    rideTime
  }: Props) => {

  const {
    userAddress,
    userLongitude, 
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude
  } = useLocationStore();

  const request = {
    originAddress: userAddress!,
    destinationAddress: destinationAddress!.toString(),
    originLatitude: userLatitude!.toString(),
    originLongitude: userLongitude!.toString(),
    destinationLatitude: destinationLatitude!.toString(),
    destinationLongitude: destinationLongitude!.toString(),
    rideTime: rideTime,
    farePrice: amount,  
    paymentStatus: "Waiting accepting",
    userEmail: email,
    driverId: driverId,
    rideStatus:"Waiting accepting"
  };

  console.log(`create ride userLatitude: ${userLatitude}`);
  console.log(`create ride userLongitude: ${userLongitude}`);

  return (
    <View className="mt-2">
      <TouchableOpacity  className={`rounded-full p-3 flex flex-row justify-center shadow-md shadow-neutral-400/70 primary bg-[#0286ff]` } onPress={() => handleCreateRide(request)}>
      <Text className={`text-lg font-bold text-white`}>Add Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

