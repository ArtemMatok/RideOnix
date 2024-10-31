import { Ride } from "@/types/type";
import axios from "axios";
import { Alert } from "react-native";

export interface RideRequest{
    originAddress: string,
    destinationAddress: string,
    originLatitude: string,
    originLongitude: string,
    destinationLatitude: string,
    destinationLongitude: string,
    rideTime: number,
    farePrice: string,
    paymentStatus: string,
    userEmail: string,
    driverId: number,
}

const api  = "http://192.168.0.202:5029/api/Ride/"


export const addRide = async(rideRequest: RideRequest) => {
    try {
        console.log("RideRequest:",rideRequest);
        const data = await axios.post(api + "AddRide", rideRequest);
        if(data){
            return data.data;
        }else{
            console.log("data error:");
        }
    } catch (error:any) {
        console.log("addRideERROR:",error.response.data);
        Alert.alert("Ooops, someting went wrong...");
    }
}

export const getRidesByUserEmail = async( userEmail:string) => {
    try {
        const data = await axios.get<Ride[]>(api+`GetRidesByUserEmail/${userEmail}`);
        if(data){
           console.log("length:",data.data.length)
            return data.data;
        }else{
            console.log("Data rides error");
        }
    } catch (error:any) {
        console.log("GetRidesError:",error.response.data);
    }
}

export const getRideByDriverEmail = async (driverEmail:string) => {
    //TODO
    try {
        var data= await axios.get<Ride[]>(api + `GetRidesByDriverEmail/${driverEmail}`);
        if(data){
            return data.data;
        }else{
            console.log("GetRidesByDriverEmail data error");
        }
    } catch (error:any) {
     console.log("GetRidesByDriverEmail:", error.response.data);   
    }
}

export const CanceledRide = async (rideId:number) => {
    try {
        const data = await axios.put(api+`CancaledRide/${rideId}`);
        if(data){
            return true;
        }else{
            Alert.alert("Canceling is not successed");
            return false;
        
        }
    } catch (error:any) {
        console.log('CancelRideError:', error.response.data);
        Alert.alert("Something went wrong...")
    }
}

export const IsRideWaiting = async(userEmail:string) => {
    try {
        const data = await axios.get<boolean>(api + `IsRideWaiting/${userEmail}`);
        return data.data;
    } catch (error:any) {
        console.log("isRideWaiting error:",error.response.data);
    }
}

export const AcceptingRide = async(rideId:number) => {
    try {
        const data = await axios.put(api + `AcceptingRide/${rideId}`);

        if(data){
            return data.data;
        }
    } catch (error:any) {
        console.log("AcceptingRide error:", error.response.data);
        Alert.alert("Try again later...")
    }
}

export const GetRideById = async(rideId:number) => {
    try {
        const data = await axios.get<Ride>(api + `GetRideById/${rideId}`);
        if(data){
            return data.data;
        }
    } catch (error:any) {
        console.log("GetRideById error:",error.repsonse.data);
    }
}

export const PaymentRide = async(rideId:number, paymentMethod:string) => {
    try {
        const data = await axios.put(api + `PaymentRide/${rideId}/${paymentMethod}`);
        if(data){
            return data.data;
        }
    } catch (error:any) {
        console.log("PaymentRide error:",error.repsonse.data);
    }
}

export const StartRide = async(rideId:number) => {
    try {
        const data = await axios.put(api+`StartRide/${rideId}`);
        if(data){
            return data.data
        }else{
            console.log("error data startRide");
        }
    } catch (error:any) {
        console.log("StartRide error:",error.repsonse.data);
    }
}

export const FinishRide = async(rideId:number) => {
    try {
        const data = await axios.put(api+`FinishRide/${rideId}`);
        if(data){
            return data.data
        }
    } catch (error:any) {
        console.log("FinishRide error:",error.repsonse.data);
    }
}

export const RatingRide = async(rideId:number, rating:number) => {
    try {
        const data = await axios.put(api + `RatingRide/${rideId}/${rating}`);
        if(data){
            return data.data;
        }
    } catch (error:any) {
        console.log("RatingRide error:",error.repsonse.data);
    }
}