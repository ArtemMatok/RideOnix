import { RideRequest } from "@/services/ride";
import { useLocationStore } from "@/store";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

interface Props {
  onCashClick: () => void;
}

export const CashButton = ({ onCashClick }: Props) => {
  return (
    <View className="mt-2">
      <TouchableOpacity
        className={`rounded-full p-3 flex flex-row justify-center shadow-md shadow-neutral-400/70 primary bg-[#0286ff]`}
        onPress={onCashClick}
      >
        <Text className={`text-lg font-bold text-white`}>Cash Payment</Text>
      </TouchableOpacity>
    </View>
  );
};
