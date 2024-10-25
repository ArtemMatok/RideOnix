import { Button, Image, Modal, Text, View, ScrollView } from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserByEmail } from "@/services/appUser";
import { UserGet } from "@/models/appUser";
import { PaymentMethod } from "@/types/type";

const BookRide = () => {
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const [email, setEmail] = useState<string>();
  const [user, setUser] = useState<UserGet>();
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const driverDetails = drivers?.filter(
    (driver) => +driver.driverId === selectedDriver
  )[0];

  useEffect(() => {
    const getUserByEmail = async () => {
      const userEmail = await AsyncStorage.getItem("@user_email");

      if (userEmail) {
        setEmail(userEmail);
        const data = await GetUserByEmail(userEmail);
        if (data) {
          setUser(data);
        }
      }
    };
    getUserByEmail();
  }, []);

  return (
    <RideLayout title="Book Ride" snapPoints={["40%", "90%"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Ride Information
        </Text>

        <View className="flex flex-col w-full items-center justify-center mt-10">
          <Image
            source={{ uri: driverDetails?.profileImageUrl }}
            className="w-28 h-28 rounded-full"
          />

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {driverDetails?.fullName}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image
                source={icons.star}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Type of car</Text>
            <Text className="text-lg font-JakartaRegular text-black">
              {driverDetails?.typeOfCar}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Price</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              ${driverDetails?.price}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
            <Text className="text-lg font-JakartaRegular">
              {formatTime(parseInt(`${driverDetails?.time!}`))}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Car Seats</Text>
            <Text className="text-lg font-JakartaRegular">
              {driverDetails?.carSeats}
            </Text>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {userAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {destinationAddress}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3 mt-5">
          <Image source={icons.dollar} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {paymentMethod === "Card" ? "Card" : "Cash"}
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

        <Payment
          userName={user?.username!}
          email={user?.email!}
          amount={driverDetails?.price!}
          driverId={driverDetails?.driverId}
          rideTime={driverDetails?.time!}
          paymentMethod={paymentMethod as PaymentMethod}
        />
      </ScrollView>
    </RideLayout>
  );
};

export default BookRide;
