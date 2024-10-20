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


