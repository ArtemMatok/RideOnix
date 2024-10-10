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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }
        public string CarImage { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "The number of car seats must be greater than 0.")]
        public int CarSeats { get; set; }
        public double Rating { get; set; } = 0;
    }
}
