import { Alert, Button, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import {
  PaymentSheetError,
  StripeProvider,
  useStripe,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  addRide,
  GetRideById,
  PaymentRide,
  RideRequest,
} from "@/services/ride";
import { CreateRide } from "./CreateRide";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { PaymentMethod, Ride } from "@/types/type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CheckoutScreen from "./CheckOutScreen";
import { CashButton } from "./CashButton";
import { UserGet } from "@/models/appUser";
import { GetUserByEmail } from "@/services/appUser";

interface Props {
  paymentMethod: string;
  rideId: string;
}

const PaymentAccept = ({ paymentMethod, rideId }: Props) => {
  const [success, setSuccess] = useState(false);
  const [ride, setRide] = useState<Ride>();
  const [user, setUser] = useState<UserGet>();

  const publishableKey =
    "pk_test_51NptwQIBIeskGBr17Y9fkO6p53V9HCEVAqEfSMYu2fX7eRvLX1ofcLbfImSqTY3CXJX4cCcZOTDbvexeVlqiMG0R00I6uPuecC";

  const onCashClick = async () => {
    const paymentResult = await PaymentRide(Number(rideId), paymentMethod);
    if (paymentResult) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const rideData = await GetRideById(Number(rideId));
      if (rideData) {
        setRide(rideData);
        const userData = await GetUserByEmail(rideData.userEmail);
        if (userData) {
          setUser(userData);
          console.log("user:", user);
          console.log("ride:", ride);
        }
      }
    };
    fetchData();
  }, []);
  const openPaymentSheet = () => {};
  return (
    <>
      {/* {paymentMethod === ("cash" as PaymentMethod) ? (
         <CreateRide
           handleCreateRide={createRide}
           amount={amount}
           driverId={driverId}
           email={email}
           rideTime={rideTime}
         />
       ) : (
         <GestureHandlerRootView>
           <StripeProvider
             publishableKey={publishableKey}
             merchantIdentifier="merchant.identifier" // required for Apple Pay
             urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
           >
             <CheckoutScreen
               name={userName}
               email={email}
               amount={Number(amount)}
               driverId={driverId}
               rideTime={rideTime}
             />
           </StripeProvider>
         </GestureHandlerRootView>
       )}

       <ReactNativeModal
         isVisible={success}
         onBackdropPress={() => setSuccess(false)}
       >
         <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
           <Image source={images.check} className="w-28 h-28 mt-5" />

           <Text className="text-2xl text-center font-JakartaBold mt-5">
             Ride booked!
           </Text>

           <Text className="text-md text-general-200 font-JakartaMedium text-center mt-3">
             Thank you for your booking. Your reservation has been placed. Please
             proceed with your trip!
           </Text>

           <CustomButton
             title="Back Home"
             onPress={() => {
               setSuccess(false);
               router.push("/(root)/(tabs)/Home");
             }}
             className="mt-5"
           ></CustomButton>
         </View>
       </ReactNativeModal> */}
      {paymentMethod === "cash" ? (
        <CashButton onCashClick={onCashClick} />
      ) : (
        <GestureHandlerRootView>
          <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          >
            <CheckoutScreen
              name={user?.username!}
              email={ride?.userEmail!}
              amount={Number(ride?.farePrice)}
              driverId={ride?.driverId!}
              rideTime={ride?.rideTime!}
              rideId={ride?.rideId!}
              paymentMethod={paymentMethod}
            />
          </StripeProvider>
        </GestureHandlerRootView>
      )}

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Ride booked!
          </Text>

          <Text className="text-md text-general-200 font-JakartaMedium text-center mt-3">
            Thank you for your booking. Your ride was paid. Wait for starting
            ride!
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/Home");
            }}
            className="mt-5"
          ></CustomButton>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default PaymentAccept;
