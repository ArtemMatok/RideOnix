using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTOs.DriverDtos
{
    public class DriverShortDto
    {
        public int DriverId { get; set; }
        public string FirstName { get; set; }   
        public string LastName { get; set; } 
        public int CarSeats { get; set; }   
    }
}
