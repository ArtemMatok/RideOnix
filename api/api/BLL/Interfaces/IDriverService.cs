using Business.DTOs.DriverDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IDriverService
    {
        Task<List<DriverGetDto>> GetDrivers();
        Task<DriverForRideDto> GetDriverById(int id);
    }
}
