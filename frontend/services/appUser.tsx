import { newUserGet, RegisterDto } from "@/models/appUser";
import axios from "axios";
import { Alert } from "react-native";

const api = "http://192.168.0.105:5234/api/Account/"

export const RegisterUser = async (registerUser:RegisterDto) => {
    try {
        const data = await axios.post<newUserGet>(api + "Register", registerUser);
        return data.data
    } catch (error) {
        console.log(error);
        Alert.alert("Something went wrong");        
    }
}