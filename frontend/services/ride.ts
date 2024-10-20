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

const api  = "http://192.168.0.205:5029/api/Ride/"

// export const addRide = async (rideRequest: RideRequest) => {
//     try {
//         await fetch(api + 'AddRide', {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify(rideRequest)
//         });   
         
//         console.log("Success");
//     } catch (error) {
//         console.log("ConfirmRideError:",error);
//     }
    
// };


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