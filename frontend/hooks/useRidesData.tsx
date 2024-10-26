import { useState } from "react";
import { getRidesByUserEmail, CanceledRide, IsRideWaiting } from "@/services/ride";
import { Ride } from "@/types/type";

export const useRidesData = (email: string | undefined) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const[isRideWaiting, setIsRideWaiting] = useState<boolean>();

  const fetchRides = async () => {
    if (email) {
      const dataRides = await getRidesByUserEmail(email);
      if (dataRides) setRides(dataRides);
    }
    await isWaiting();
    setLoading(false);
  };

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
    }
  };

  const isWaiting = async () => {
    const data = await IsRideWaiting();
    if(data){
      setIsRideWaiting(data.data);
    }
  }

  return { rides, loading, fetchRides, cancelRide, isRideWaiting };
};
