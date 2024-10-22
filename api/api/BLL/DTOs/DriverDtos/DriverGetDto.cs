using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTOs.DriverDtos
{
    public class DriverGetDto
    {
        public int DriverId { get; set; }
        public string FullName { get; set; }    
        public string ProfileImageUrl { get; set; }
        public string TypeOfCar { get;set; }    
        public string CarImage { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "The number of car seats must be greater than 0.")]
        public int CarSeats { get; set; }
        public double Rating { get; set; }
    }
}
