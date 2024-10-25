export type DriverGetDto = {
  driverId: number;
  fullName: string;
  email:string;
  profileImageUrl: string;
  typeOfCar: "Comfort" | "Business";
  carImage: string;
  carSeats: number;
  rating: number;
};
