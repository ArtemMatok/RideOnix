import { GetUserByEmail } from "@/services/appUser";
import { getRideByDriverEmail, getRidesByUserEmail } from "@/services/ride";
import {
  DriverStore,
  LocationStore,
  MarkerData,
  Ride,
  RidesStore,
  UserStore,
} from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: async (userEmail: string) => {
    const userData = await GetUserByEmail(userEmail);
    set({ user:userData }); // синхронно оновлюємо стан після отримання результату
  },
  handleSignedOut: async() => {
    await AsyncStorage.removeItem("@user_email");
    router.push("/(auth)/Welcome");
    set({user:null})
  }
}));

export const useRidesStore = create<RidesStore>((set) => ({
    rides:[] as Ride[],
    setRides : async(email:string, role:string) => {
        if(role === "User"){
            const ridesData = await getRidesByUserEmail(email);
            set({rides:ridesData})
        }else{
            const ridesData = await getRideByDriverEmail(email);
            set({rides:ridesData})
        }
    }
}))
