import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonProps } from "@/types/type";
import { RideRequest } from "@/services/ride";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-greren-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
      default:
        return "bg-[#0286ff]"
  }
};

const getTextVariantTextStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
      case "primary":
        return "bg-black";
      case "secondary":
        return "text-gra-100";
      case "danger":
        return "bg-red-100";
      case "success":
        return "text-green-100";
        default:
          return "text-white"
    }
  };
  

type Props = {
  onPress: () => void;
  title: string;
  bgVariant?:  "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "secondary" | "danger" | "success" | "default";
  IconLeft?: any;
  IconRight?: any;
  className?: string;
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconRight,
  IconLeft,
  className,
  ...props
}: Props) => {
  return (
    
    <TouchableOpacity
      onPress={onPress}
      className={` rounded-full p-3 flex flex-row justify-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}` }
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantTextStyle(textVariant)}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
