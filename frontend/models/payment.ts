export type PaymentSheetCreateResponse = {
    paymentIntent:any;
    ephemeralKey:string;
    customer:any;
    publishableKey:string;
}

export type CreatePaymentSheetRequest = {
    name:string;
    email:string;
    amount:number;
}

export type ConfirmPaymentRequest = {
    paymentMethodId:string;
    paymentIntendId:string;
    customerId:string;
}