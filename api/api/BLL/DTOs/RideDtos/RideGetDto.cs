using Business.DTOs.DriverDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTOs.RideDtos
{
    public class RideGetDto
    {
        public int RideId { get; set; }
        public string OriginAddress { get; set; }
        public string DestinationAddress { get; set; }
        public string OriginLatitude { get; set; }
        public string OriginLongitude { get; set; }
        public string DestinationLatitude { get; set; }
        public string DestinationLongitude { get; set; }
        public double RideTime { get; set; }
        public string FarePrice { get; set; }
        public string PaymentStatus { get; set; }
        public string UserEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public int DriverId { get; set; }
        public DriverShortDto Driver { get; set; }
    }
}
