import { useState } from "react";
import * as Location from "expo-location";
import { useLocationStore } from "@/store";
import { router } from "expo-router";

export const useLocationPermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setHasPermissions(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      address: `${address[0].name}, ${address[0].region}`,
    });
    setHasPermissions(true);
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/FindRide");
  };

  return { hasPermissions, requestLocation,handleDestinationPress}
};
