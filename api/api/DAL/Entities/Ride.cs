using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Data.Entities
{
    public class Ride
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
        public DateTime CreatedAt { get; set; } = DateTime.Now;


        //User
        public string userEmail { get; set; }
        public AppUser AppUser { get; set; }


        //Driver
        [ForeignKey("Driver")]
        public int DriverId { get; set; }
        public Driver Driver { get; set; }
    }
}

