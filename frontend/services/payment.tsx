import { ConfirmPaymentRequest, CreatePaymentSheetRequest, PaymentSheetCreateResponse } from "@/models/payment"
import axios from "axios"

const api = "http://192.168.0.200:5029/api/Payment/"

export const paymentSheet = async(request:CreatePaymentSheetRequest) => {
    try {
        var data = await axios.post< { paymentIntent:any, ephemeralKey:any, customer:any }>(api + "payment-sheet", request);
        if(data){
            return data.data;
        }else{
            console.log("Data error paymont sheet");
        }
    } catch (error) {
        console.log("Payment sheet catch error");
    }
}