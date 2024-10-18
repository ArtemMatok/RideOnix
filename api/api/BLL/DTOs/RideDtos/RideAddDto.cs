using Business.DTOs.DriverDtos;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTOs.RideDtos
{
    public class RideAddDto
    { 
        public string OriginAddress { get; set; }
        public string DestinationAddress { get; set; }
        public string OriginLatitude { get; set; }
        public string OriginLongitude { get; set; }
        public string DestinationLatitude { get; set; }
        public string DestinationLongitude { get; set; }
        public double RideTime { get; set; }
        public string FarePrice { get; set; }
        public string PaymentStatus { get; set; }

        //User
        public string userEmail { get; set; }


        //Driver
        public int DriverId { get; set; }
        //public DriverForRideDto DriverForRide { get; set; }

    }
}


// DTO
//declare interface Ride
//{
//    origin_address: string;
//    destination_address: string;
//    origin_latitude: number;
//    origin_longitude: number;
//    destination_latitude: number;
//    destination_longitude: number;
//    ride_time: number;
//    fare_price: number;
//    payment_status: string;
//    user_email: string;
//    created_at: string;
//    driver_id: number;
//    driver: {
//        first_name: string;
//        last_name: string;
//        car_seats: number;
//    };
//}


//DB 
//{
//    "ride_id": "1",
//        "origin_address": "Kathmandu, Nepal",
//        "destination_address": "Pokhara, Nepal",
//        "origin_latitude": "27.717245",
//        "origin_longitude": "85.323961",
//        "destination_latitude": "28.209583",
//        "destination_longitude": "83.985567",
//        "ride_time": 391,
//        "fare_price": "19500.00",
//        "payment_status": "paid",
//        "driver_id": 2,
//        "user_id": "1",
//        "created_at": "2024-08-12 05:19:20.620007",
//        "driver": {
//        "driver_id": "2",
//            "first_name": "David",
//            "last_name": "Brown",
//            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
//            "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
//            "car_seats": 5,
//            "rating": "4.60"
//        }