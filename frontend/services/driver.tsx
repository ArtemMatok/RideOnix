import { DriverGetDto } from "@/models/driver";
import axios from "axios";
import { Alert } from "react-native";

const api ="http://192.168.0.200:5029/api/Driver/"

export const GetDrivers = async () => {
    try {
        const data = await axios.get<DriverGetDto[]>(api + "GetDrivers");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetDriverByEmail = async(email:string) => {
    try {
        const data = await axios.get<DriverGetDto>(api + `GetDriverByEmail/${email}`);
        if(data){
            return data.data;
        }
    } catch (error:any) {
        console.log("GetDriverByEmail:", error.response.data);
    }
}

export const isDriverExist = async (email:string):Promise<boolean> => {
    try {
        const data = await axios.get<DriverGetDto>(api + `GetDriverByEmail/${email}`);
        if(data){
            return true;
        }else{
            return false;
        }
    } catch (error:any) {
        console.log("GetDriverByEmail:", error.response.data);
        return false;
    }
}

export const EditDriverProfile = async (driverId:number, driverDto:DriverGetDto) => {
    try {
        console.log("Driver in services:",driverDto);
        const data = await axios.put(api+`EditDriver/${driverId}`,driverDto );
        if(data){
            Alert.alert("Successfully saved!")
        }
    } catch (error:any) {
        console.log("EditDriverProfile error:", error.response.data);
        Alert.alert("Something went wrong during saving");
    }
}