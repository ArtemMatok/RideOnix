import { ConfirmPaymentRequest, CreatePaymentSheetRequest, PaymentSheetCreateResponse } from "@/models/payment"

const api = "http://192.168.0.202:5029/api/Payment/"

export const CreatePaymentSheet = async (req:CreatePaymentSheetRequest) =>{
    try {
        const data = await axios.post<PaymentSheetCreateResponse>(api + "payment-sheet", req);

        return data.data;
    } catch (error) {
        console.log("Payment:",error);
    }
} 

export const ConfirmPayment = async (req:ConfirmPaymentRequest) => {
    try {
        const data = await axios.post<{success:boolean, message:string, result:any}>(api + "confirm-payment", req);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}