
import { LoginDto } from "@/models/appUser";
import { Alert } from "react-native";

export const loginValidation = (form: LoginDto):boolean => {
  if (form.email === "" || form.password === "") {
    Alert.alert("All fields are required");
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    Alert.alert("Please enter a valid email address");
    return false;
  } else if (!/(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/.test(form.password)) {
    Alert.alert(
      "Password must contain at least one uppercase letter, one '@' symbol, and be at least 8 characters long"
    );
    return false;
  }

  return true;
};
