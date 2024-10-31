import { UserGet } from "@/models/appUser";
import {
  AcceptingRide,
  CanceledRide,
  FinishRide,
  IsRideWaiting,
  RatingRide,
  StartRide,
} from "@/services/ride";
import { Ride } from "@/types/type";
import { useState } from "react";

export const useRides = (user: UserGet) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isRideWaiting, setIsRideWaiting] = useState<boolean>();

  const cancelRide = async (rideId: number) => {
    const result = await CanceledRide(rideId);
    if (result) {
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId
            ? { ...ride, rideStatus: "Canceled", paymentStatus: "Canceled" }
            : ride
        )
      );
      const isWaitingRide = await IsRideWaiting(user.email);
      setIsRideWaiting(isWaitingRide);
    }
  };

  const onRateDriver = async (rideId: number, rating: number) => {
    await RatingRide(rideId, rating);
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId ? { ...ride, rideRaiting: rating } : ride
      )
    );
  };

  const onAcceptRide = async (rideId: number) => {
    const result = await AcceptingRide(rideId);
    if (result) {
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.rideId === rideId
            ? {
                ...ride,
                rideStatus: "Accepted",
                paymentStatus: "Waiting for payment",
              }
            : ride
        )
      );
    }
  };

  const onStartRide = async (rideId: number) => {
    await StartRide(rideId);

    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId ? { ...ride, rideStatus: "Started" } : ride
      )
    );
  };

  const onFinishRide = async (rideId: number) => {
    await FinishRide(rideId);

    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.rideId === rideId ? { ...ride, rideStatus: "Finished" } : ride
      )
    );
  };
  return {
    rides,
    isRideWaiting,
    cancelRide,
    onRateDriver,
    setIsRideWaiting,
    setRides,
    onFinishRide,
    onStartRide,
    onAcceptRide,
  };
};
