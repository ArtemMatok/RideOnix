using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class Driver
    {
        public int DriverId { get; set; }
        public string FullName { get; set; }    
        public string Email { get;set; }
        public string TypeOfCar { get; set; } = "Comfort";
        public string ProfileImageUrl { get; set; } = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        public string CarImage { get; set; } = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png";
        public bool IsAvailable { get; set; } = true;
        [Range(1, int.MaxValue, ErrorMessage = "The number of car seats must be greater than 0.")]
        public int CarSeats { get; set; } = 1;
        public double? Rating { get; set; } = 0;

        public List<Ride> Rides { get; set; } = new List<Ride>();
    }
}
