import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { UserGet } from "@/models/appUser";
import { DriverGetDto } from "@/models/driver";
import { EditDriverProfile, GetDriverByEmail } from "@/services/driver";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const ProfileDriver = () => {
  const [driver, setDriver] = useState<DriverGetDto>();
  const [visible, setVisible] = useState(false);
  const [typeOfCar, setTypeOfCar] = useState<string>();
  const [newProfileImage, setNewProfileImage] = useState<string>();

  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [carSeats, setCarSeats] = useState<string>();

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted) {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setNewProfileImage(pickerResult.assets[0].uri);
      }
    } else {
      alert("Permission to access gallery is required!");
    }
  };

  const chooseTypeOfCar = (typeOfCar: string) => {
    setTypeOfCar(typeOfCar);
    if (driver) {
      driver.typeOfCar = typeOfCar as "Comfort" | "Business";
    }
  };

  useEffect(() => {
    const getDriver = async () => {
      const driverEmail = await AsyncStorage.getItem("@user_email");

      if (driverEmail) {
        const data = await GetDriverByEmail(driverEmail);
        if (data) {
          setDriver(data);
          setTypeOfCar(data.typeOfCar);
        }
      }
    };
    getDriver();
  }, []);

  const onSaveChanges = async () => {
    if (driver) {
      if(carSeats){
        driver.carSeats =Number(carSeats);
      }
      if(fullName){
        driver.fullName = fullName;
      }
      if(newProfileImage){
        driver.profileImageUrl = newProfileImage;
      }

     console.log("Driver in page:", driver);
      
      var data = await EditDriverProfile(driver?.driverId, driver);
    } else {
      Alert.alert("Cannot found driver");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="px-5 "
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Text className="text-2xl font-JakartaBold my-5">My profile</Text>
          <View className="flex items-center justify-center my-5">
            <Image
              source={{
                uri:
                  newProfileImage ||
                  driver?.profileImageUrl ||
                  "https://via.placeholder.com/110",
              }}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
            <CustomButton
              title="Change photo"
              onPress={pickImage}
              className="mt-3"
            />
          </View>

          <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
            <View className="flex flex-col items-start justify-start w-full">
              <InputField
                label="Full name"
                placeholder={driver?.fullName || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                onChangeText={setFullName}
                editable={true}
              />


              <Button
                title="Choose type of car"
                onPress={() => setVisible(true)}
              />

              <Modal visible={visible} transparent={true}>
                <View className="flex-1 justify-center items-center">
                  <View className="bg-white p-5 rounded-xl w-4/5">
                    <Text className="text-lg font-semibold mb-2">
                      Type of car
                    </Text>
                    <Picker
                      selectedValue={typeOfCar}
                      onValueChange={(itemValue) => chooseTypeOfCar(itemValue)}
                      className="w-full"
                    >
                      <Picker.Item label="Business" value="Business" />
                      <Picker.Item label="Comfort" value="Comfort" />
                    </Picker>
                    <Button title="Close" onPress={() => setVisible(false)} />
                  </View>
                </View>
              </Modal>
              <InputField
                label="Type of car"
                placeholder={typeOfCar}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Car seats"
                placeholder={String(driver?.carSeats) || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                onChangeText={setCarSeats}
                editable={true}
              />
            </View>
          </View>
          <CustomButton
            className="my-3"
            title="Save changes"
            onPress={onSaveChanges}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileDriver;
