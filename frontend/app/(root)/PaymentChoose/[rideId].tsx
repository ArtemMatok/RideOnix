import {
  Button,
  Image,
  Modal,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { PaymentMethod, Ride } from "@/types/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetRideById } from "@/services/ride";
import { DriverGetDto } from "@/models/driver";
import { GetDriverFullById, GetDriverRating } from "@/services/driver";
import PaymentAccept from "@/components/PaymentAccept";

const PaymentChoose = () => {
  const [ride, setRide] = useState<Ride>();
  const [driver, setDriver] = useState<DriverGetDto>();
  const [paymentMethod, setPaymentMethod] = useState<string>("Card");
  const [visible, setVisible] = useState(false);
  const[ratingDriver, setRatingDriver] = useState<number>();

  const { rideId } = useLocalSearchParams() ;

  useEffect(() => {
    const fetchData = async () => {
      const rideData = await GetRideById(Number(rideId));
      if (rideData) {
        setRide(rideData);
        const driverData = await GetDriverFullById(rideData.driverId);
        if (driverData) {
          setDriver(driverData);
          const ratingData = await GetDriverRating(driverData.email);
          if(ratingData){
            setRatingDriver(ratingData);
          }
        }
      }
    };
    fetchData();
  }, []);

  return (
    <RideLayout title="Book Ride" snapPoints={["40%", "90%"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Ride Information
        </Text>

        <View className="flex flex-col w-full items-center justify-center mt-10">
          <Image
            source={{ uri: driver?.profileImageUrl }}
            className="w-28 h-28 rounded-full"
          />

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {driver?.fullName}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image
                source={icons.star}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-JakartaRegular">
                {ratingDriver}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Type of car</Text>
            <Text className="text-lg font-JakartaRegular text-black">
              {driver?.typeOfCar}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Price</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              ${ride?.farePrice}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
            <Text className="text-lg font-JakartaRegular">
              {formatTime(parseInt(`${ride?.rideTime!}`))}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Car Seats</Text>
            <Text className="text-lg font-JakartaRegular">
              {driver?.carSeats}
            </Text>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {ride?.originAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {ride?.destinationAddress}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3 mt-5">
          <Image source={icons.dollar} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {paymentMethod.toUpperCase()}
          </Text>
        </View>
        <Button
          title="Choose method of payment"
          onPress={() => setVisible(true)}
        />

        <Modal visible={visible} transparent={true}>
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-5 rounded-xl w-4/5">
              <Text className="text-lg font-semibold mb-2">
                Method of payment
              </Text>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                className="w-full"
              >
                <Picker.Item label="Card" value="card" />
                <Picker.Item label="Cash" value="cash" />
              </Picker>
              <Button title="Close" onPress={() => setVisible(false)} />
            </View>
          </View>
        </Modal>

        <PaymentAccept paymentMethod={paymentMethod} rideId={rideId as string} />
      </ScrollView>
    </RideLayout>
  );
};

export default PaymentChoose;
