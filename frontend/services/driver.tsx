import { DriverGetDto } from "@/models/driver";
import axios from "axios";

const api ="http://192.168.0.202:5029/api/Driver/"

export const GetDrivers = async () => {
    try {
        const data = await axios.get<DriverGetDto[]>(api + "GetDrivers");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}