import { LoginDto, newUserGet, RegisterDto, UserGet } from "@/models/appUser";
import axios from "axios";
import { Alert } from "react-native";

const api = "http://192.168.0.108:5029/api/Account/"
// const api2 = "http://192.168.0.111:5234/api/Account/" 

export const RegisterUser = async (registerUser:RegisterDto) => {
    try {
        const data = await axios.post<newUserGet>(api + "Register", registerUser);
        return data.data;
    } catch (error) {
        console.log(error);
        Alert.alert("Something went wrong");        
    }
}

export const LoginUser = async (loginUser: LoginDto) => {
    try{
        const data = await axios.post<newUserGet>(api + "Login", loginUser);
        return data.data;
    }catch(error){
        console.log(error);
        Alert.alert("Something went wrong");
    }
}

export const GetUserByEmail = async (email:string) => {
    try {
        const data = await axios.get<UserGet>(api+`GetUserByEmail/${email}`);
        return data.data
    } catch (error) {
        console.log(error);
    }
}