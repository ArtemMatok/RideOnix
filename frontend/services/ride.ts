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

export const addRide = async (rideRequest: RideRequest) => {
    try {
        await fetch('http://192.168.0.202:5029/api/Ride/AddRide', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(rideRequest)
        });    
        console.log("Success");
    } catch (error) {
        console.log("ConfirmRideError:",error);
    }
    
};