export type DriverGetDto = {
    driverId:number;
    firstName:string;
    lastName:string;
    profileImageUrl:string;
    typeOfCar:"Comfort" | "Business";
    carImage:string;
    carSeats:number;
    rating:number
}